from fastapi import FastAPI, APIRouter, UploadFile, File, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone
import aiofiles
import shutil


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create uploads directory
UPLOAD_DIR = ROOT_DIR / 'uploads'
UPLOAD_DIR.mkdir(exist_ok=True)

# Create the main app without a prefix
app = FastAPI()

# Mount uploads directory for static file serving
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class Block(BaseModel):
    id: str
    type: str
    content: Optional[str] = ""

class PageSettings(BaseModel):
    """Page settings including SEO and code injection"""
    pageUrl: str = "index.html"
    pageDescription: str = ""
    socialSharingEnabled: bool = True
    socialSharingImageUrl: str = ""
    headCode: str = ""
    bodyEndCode: str = ""
    beforeDoctypeCode: str = ""

class Page(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    blocks: List[Block] = []
    # Page settings
    pageUrl: str = "index.html"
    pageDescription: str = ""
    socialSharingEnabled: bool = True
    socialSharingImageUrl: str = ""
    headCode: str = ""
    bodyEndCode: str = ""
    beforeDoctypeCode: str = ""

class PageCreate(BaseModel):
    name: str
    pageUrl: Optional[str] = "page.html"

class PageUpdate(BaseModel):
    name: Optional[str] = None
    blocks: Optional[List[Block]] = None
    pageUrl: Optional[str] = None
    pageDescription: Optional[str] = None
    socialSharingEnabled: Optional[bool] = None
    socialSharingImageUrl: Optional[str] = None
    headCode: Optional[str] = None
    bodyEndCode: Optional[str] = None
    beforeDoctypeCode: Optional[str] = None

# Site Styles Models (must be before Site model)
class FontConfig(BaseModel):
    family: str = "Inter Tight"
    size: float = 1.4

class SiteColors(BaseModel):
    primary: str = "#4CAF50"
    buttonsAndLinks: List[str] = ["#FF69B4", "#8B4513", "#8B0000", "#48D1CC", "#FFFFFF"]

class SiteFonts(BaseModel):
    title1: FontConfig = Field(default_factory=lambda: FontConfig(family="Inter Tight", size=5))
    title2: FontConfig = Field(default_factory=lambda: FontConfig(family="Inter Tight", size=4))
    title3: FontConfig = Field(default_factory=lambda: FontConfig(family="Inter Tight", size=2))
    text: FontConfig = Field(default_factory=lambda: FontConfig(family="Inter Tight", size=1.4))
    menu: FontConfig = Field(default_factory=lambda: FontConfig(family="Inter Tight", size=1.4))

class SiteOptions(BaseModel):
    roundedCorners: bool = False
    roundedButtons: bool = False
    largeButtons: bool = False
    underlinedLinks: bool = False
    animationOnScroll: bool = False

class SiteStyles(BaseModel):
    colors: SiteColors = Field(default_factory=SiteColors)
    fonts: SiteFonts = Field(default_factory=SiteFonts)
    options: SiteOptions = Field(default_factory=SiteOptions)
    customCSS: str = ""

class Site(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    status: str = "unpublished"
    pages: List[Page] = []
    siteStyles: SiteStyles = Field(default_factory=SiteStyles)
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updatedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class SiteCreate(BaseModel):
    name: str

class SiteUpdate(BaseModel):
    name: Optional[str] = None
    status: Optional[str] = None
    pages: Optional[List[Page]] = None

class SiteSync(BaseModel):
    """Complete site data for sync from frontend"""
    id: str
    name: str
    status: str
    pages: List[Page]
    siteStyles: Optional[SiteStyles] = Field(default_factory=SiteStyles)

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# ============= SITES ENDPOINTS =============

@api_router.post("/sites", response_model=Site)
async def create_site(site_input: SiteCreate):
    """Create a new site with a default Home page"""
    # Create default home page
    home_page = Page(
        id=str(uuid.uuid4()),
        name="Home",
        pageUrl="index.html",
        blocks=[]
    )
    
    # Create site
    site = Site(
        id=str(uuid.uuid4()),
        name=site_input.name,
        status="unpublished",
        pages=[home_page]
    )
    
    # Convert to dict for MongoDB
    site_dict = site.model_dump()
    site_dict['createdAt'] = site_dict['createdAt'].isoformat()
    site_dict['updatedAt'] = site_dict['updatedAt'].isoformat()
    
    await db.sites.insert_one(site_dict)
    return site

@api_router.get("/sites", response_model=List[Site])
async def get_sites():
    """Get all sites"""
    sites = await db.sites.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO timestamps back to datetime
    for site in sites:
        if isinstance(site.get('createdAt'), str):
            site['createdAt'] = datetime.fromisoformat(site['createdAt'])
        if isinstance(site.get('updatedAt'), str):
            site['updatedAt'] = datetime.fromisoformat(site['updatedAt'])
    
    return sites

@api_router.get("/sites/{site_id}", response_model=Site)
async def get_site(site_id: str):
    """Get a specific site by ID"""
    site = await db.sites.find_one({"id": site_id}, {"_id": 0})
    
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")
    
    # Convert ISO timestamps
    if isinstance(site.get('createdAt'), str):
        site['createdAt'] = datetime.fromisoformat(site['createdAt'])
    if isinstance(site.get('updatedAt'), str):
        site['updatedAt'] = datetime.fromisoformat(site['updatedAt'])
    
    return site

@api_router.put("/sites/{site_id}", response_model=Site)
async def update_site(site_id: str, site_update: SiteUpdate):
    """Update site details"""
    update_data = {k: v for k, v in site_update.model_dump().items() if v is not None}
    
    if not update_data:
        raise HTTPException(status_code=400, detail="No update data provided")
    
    update_data['updatedAt'] = datetime.now(timezone.utc).isoformat()
    
    result = await db.sites.update_one(
        {"id": site_id},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Site not found")
    
    return await get_site(site_id)

@api_router.post("/sites/sync")
async def sync_site(site_data: SiteSync):
    """Sync site from frontend - Create if doesn't exist, Update if exists"""
    existing_site = await db.sites.find_one({"id": site_data.id}, {"_id": 0})
    
    site_dict = site_data.model_dump()
    
    if existing_site:
        # Update existing site
        site_dict['updatedAt'] = datetime.now(timezone.utc).isoformat()
        site_dict['createdAt'] = existing_site.get('createdAt', datetime.now(timezone.utc).isoformat())
        
        await db.sites.replace_one({"id": site_data.id}, site_dict)
        return {"success": True, "action": "updated", "site_id": site_data.id}
    else:
        # Create new site
        site_dict['createdAt'] = datetime.now(timezone.utc).isoformat()
        site_dict['updatedAt'] = datetime.now(timezone.utc).isoformat()
        
        await db.sites.insert_one(site_dict)
        return {"success": True, "action": "created", "site_id": site_data.id}

@api_router.delete("/sites/{site_id}")
async def delete_site(site_id: str):
    """Delete a site"""
    result = await db.sites.delete_one({"id": site_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Site not found")
    
    return {"message": "Site deleted successfully"}


# ============= PAGES ENDPOINTS =============

@api_router.post("/sites/{site_id}/pages", response_model=Page)
async def create_page(site_id: str, page_input: PageCreate):
    """Create a new page in a site"""
    site = await db.sites.find_one({"id": site_id}, {"_id": 0})
    
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")
    
    # Create new page
    new_page = Page(
        id=str(uuid.uuid4()),
        name=page_input.name,
        pageUrl=page_input.pageUrl or f"{page_input.name.lower().replace(' ', '-')}.html",
        blocks=[]
    )
    
    # Add page to site
    await db.sites.update_one(
        {"id": site_id},
        {
            "$push": {"pages": new_page.model_dump()},
            "$set": {"updatedAt": datetime.now(timezone.utc).isoformat()}
        }
    )
    
    return new_page

@api_router.put("/sites/{site_id}/pages/{page_id}", response_model=Page)
async def update_page(site_id: str, page_id: str, page_update: PageUpdate):
    """Update a page's settings and content"""
    site = await db.sites.find_one({"id": site_id}, {"_id": 0})
    
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")
    
    # Find the page to update
    page_found = False
    for i, page in enumerate(site['pages']):
        if page['id'] == page_id:
            page_found = True
            # Update only provided fields
            update_data = {k: v for k, v in page_update.model_dump().items() if v is not None}
            
            for key, value in update_data.items():
                site['pages'][i][key] = value
            
            break
    
    if not page_found:
        raise HTTPException(status_code=404, detail="Page not found")
    
    # Save updated site
    await db.sites.update_one(
        {"id": site_id},
        {
            "$set": {
                "pages": site['pages'],
                "updatedAt": datetime.now(timezone.utc).isoformat()
            }
        }
    )
    
    # Return updated page
    updated_page = next((p for p in site['pages'] if p['id'] == page_id), None)
    return Page(**updated_page)

@api_router.delete("/sites/{site_id}/pages/{page_id}")
async def delete_page(site_id: str, page_id: str):
    """Delete a page from a site"""
    result = await db.sites.update_one(
        {"id": site_id},
        {
            "$pull": {"pages": {"id": page_id}},
            "$set": {"updatedAt": datetime.now(timezone.utc).isoformat()}
        }
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Site not found")
    
    return {"message": "Page deleted successfully"}


# ============= IMAGE UPLOAD ENDPOINT =============

@api_router.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    """Upload an image for social sharing"""
    # Validate file type
    allowed_types = ["image/jpeg", "image/png", "image/jpg", "image/webp"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed types: {', '.join(allowed_types)}"
        )
    
    # Generate unique filename
    file_extension = file.filename.split('.')[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = UPLOAD_DIR / unique_filename
    
    # Save file
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {str(e)}")
    
    # Return URL
    backend_url = os.environ.get('BACKEND_URL', 'http://localhost:8001')
    image_url = f"{backend_url}/uploads/{unique_filename}"
    
    return {"imageUrl": image_url, "filename": unique_filename}


# ============= HTML EXPORT ENDPOINT =============

@api_router.get("/sites/{site_id}/pages/{page_id}/export")
async def export_page_html(site_id: str, page_id: str):
    """Export a page as complete HTML file"""
    site = await db.sites.find_one({"id": site_id}, {"_id": 0})
    
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")
    
    # Find the page
    page = next((p for p in site['pages'] if p['id'] == page_id), None)
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    
    # Generate HTML
    html_content = generate_html_export(page, site['name'])
    
    # Save to temp file and return
    temp_file = UPLOAD_DIR / f"{page['name'].lower().replace(' ', '-')}-export.html"
    
    async with aiofiles.open(temp_file, 'w', encoding='utf-8') as f:
        await f.write(html_content)
    
    return FileResponse(
        path=temp_file,
        filename=f"{page['name']}.html",
        media_type="text/html"
    )


def generate_html_export(page: Dict[str, Any], site_name: str, use_external_css: bool = False) -> str:
    """Generate complete HTML from page data
    
    Args:
        page: Page data dictionary
        site_name: Name of the site
        use_external_css: If True, link to external styles.css instead of inline styles
    """
    
    # Build blocks HTML
    blocks_html = ""
    for block in page.get('blocks', []):
        if block['type'] == 'hero':
            blocks_html += f"""
    <section class="hero">
        <h1>{block.get('content', 'Hero Section')}</h1>
    </section>
"""
        elif block['type'] == 'text':
            blocks_html += f"""
    <section class="text-block">
        <p>{block.get('content', 'Text content')}</p>
    </section>
"""
        elif block['type'] == 'features':
            blocks_html += """
    <section class="features">
        <div class="feature-grid">
            <div class="feature">Feature 1</div>
            <div class="feature">Feature 2</div>
            <div class="feature">Feature 3</div>
        </div>
    </section>
"""
        elif block['type'] == 'image':
            # Extract filename from full URL if it's a backend URL
            image_src = block.get('content', 'placeholder.jpg')
            if '/uploads/' in image_src:
                # Extract just the filename and reference it from images folder
                filename = image_src.split('/uploads/')[-1]
                image_src = f"images/{filename}"
            blocks_html += f"""
    <section class="image-block">
        <img src="{image_src}" alt="Image">
    </section>
"""
        elif block['type'] == 'footer':
            blocks_html += """
    <footer>
        <p>&copy; 2025 All rights reserved</p>
    </footer>
"""
    
    # Build meta tags
    meta_tags = f"""
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{page.get('name', 'Page')}</title>"""
    
    if page.get('pageDescription'):
        meta_tags += f"""
    <meta name="description" content="{page['pageDescription']}">"""
    
    # Handle social sharing image
    if page.get('socialSharingEnabled') and page.get('socialSharingImageUrl'):
        social_image = page['socialSharingImageUrl']
        if '/uploads/' in social_image:
            # Convert to relative path for exported site
            filename = social_image.split('/uploads/')[-1]
            social_image = f"images/{filename}"
        
        meta_tags += f"""
    <meta property="og:image" content="{social_image}">
    <meta property="og:title" content="{page.get('name', 'Page')}">
    <meta property="og:description" content="{page.get('pageDescription', '')}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="{social_image}">"""
    
    # Build complete HTML
    html = ""
    
    # Before DOCTYPE code
    if page.get('beforeDoctypeCode'):
        html += page['beforeDoctypeCode'] + "\n"
    
    html += f"""<!DOCTYPE html>
<html lang="en">
<head>{meta_tags}"""
    
    # CSS - either external or inline
    if use_external_css:
        html += """
    <link rel="stylesheet" href="styles.css">"""
    else:
        html += """
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
        .hero { background: #007bff; color: white; padding: 100px 20px; text-align: center; }
        .text-block { padding: 50px 20px; }
        .features { padding: 50px 20px; }
        .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
        .feature { padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
        .image-block { text-align: center; padding: 20px; }
        .image-block img { max-width: 100%; height: auto; }
        footer { background: #333; color: white; text-align: center; padding: 20px; }
    </style>"""
    
    # Inside <head> code
    if page.get('headCode'):
        html += "\n    " + page['headCode']
    
    html += f"""
</head>
<body>
{blocks_html}"""
    
    # End of <body> code
    if page.get('bodyEndCode'):
        html += "\n    " + page['bodyEndCode']
    
    html += """
</body>
</html>"""
    
    return html


def generate_css_file() -> str:
    """Generate external CSS file content"""
    return """/* Site Styles */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

.hero {
    background: #007bff;
    color: white;
    padding: 100px 20px;
    text-align: center;
}

.text-block {
    padding: 50px 20px;
}

.features {
    padding: 50px 20px;
}

.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.feature {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.image-block {
    text-align: center;
    padding: 20px;
}

.image-block img {
    max-width: 100%;
    height: auto;
}

footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 20px;
}
"""


def extract_image_urls_from_page(page: Dict[str, Any]) -> List[str]:
    """Extract all image URLs from a page (blocks and social sharing)"""
    image_urls = []
    
    # Extract from blocks
    for block in page.get('blocks', []):
        if block['type'] == 'image' and block.get('content'):
            image_url = block.get('content')
            if image_url and '/uploads/' in image_url:
                image_urls.append(image_url)
    
    # Extract from social sharing
    if page.get('socialSharingEnabled') and page.get('socialSharingImageUrl'):
        social_img = page['socialSharingImageUrl']
        if social_img and '/uploads/' in social_img:
            image_urls.append(social_img)
    
    return image_urls


# ============= ZIP EXPORT ENDPOINT =============

@api_router.get("/sites/{site_id}/export-zip")
async def export_site_as_zip(site_id: str):
    """Export entire site as ZIP file with HTML, CSS, and images"""
    import zipfile
    import io
    from fastapi.responses import StreamingResponse
    
    site = await db.sites.find_one({"id": site_id}, {"_id": 0})
    
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")
    
    # Collect all images from all pages
    all_images = set()
    for page in site.get('pages', []):
        images = extract_image_urls_from_page(page)
        all_images.update(images)
    
    # Create a ZIP file in memory
    zip_buffer = io.BytesIO()
    
    with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
        # Add CSS file
        css_content = generate_css_file()
        zip_file.writestr("styles.css", css_content)
        
        # Add images
        for image_url in all_images:
            try:
                filename = image_url.split('/uploads/')[-1]
                local_path = UPLOAD_DIR / filename
                
                if local_path.exists():
                    zip_file.write(local_path, f"images/{filename}")
            except Exception as e:
                logger.warning(f"Failed to add image {filename} to ZIP: {str(e)}")
        
        # Export each page as HTML (with external CSS)
        for i, page in enumerate(site.get('pages', [])):
            html_content = generate_html_export(page, site['name'], use_external_css=True)
            page_name = page.get('name', 'page')
            page_filename = page.get('pageUrl', f"{page_name}.html")
            
            # Add to ZIP
            zip_file.writestr(page_filename, html_content)
            
            # First page also gets copied as index.html if it's not already named that
            if i == 0 and page_filename != 'index.html':
                zip_file.writestr("index.html", html_content)
        
        # Add a README file
        site_name = site['name']
        pages_list = '\n'.join([f"- {page['name']}: {page.get('pageUrl', page['name'] + '.html')}" for page in site.get('pages', [])])
        generated_time = datetime.now(timezone.utc).isoformat()
        
        readme_content = f"""# {site_name}

This site was exported from Mobirise Builder Clone.

Files included:
- styles.css (main stylesheet)
- images/ (folder with all images)
- HTML files for each page

Pages included:
{pages_list}

To use this site:
1. Extract all files to your web server
2. Upload to your hosting via FTP
3. Open index.html in your browser

Generated on: {generated_time}
"""
        zip_file.writestr("README.txt", readme_content)
    
    # Reset buffer position
    zip_buffer.seek(0)
    
    # Return as streaming response
    return StreamingResponse(
        io.BytesIO(zip_buffer.getvalue()),
        media_type="application/zip",
        headers={
            "Content-Disposition": f"attachment; filename={site['name'].replace(' ', '-')}.zip"
        }
    )


# ============= FTP ENDPOINTS =============

class FTPSettings(BaseModel):
    protocol: str = "FTP"
    host: str
    port: int = 21
    username: str
    password: str
    rootFolder: str = ""


@api_router.post("/ftp/test-connection")
async def test_ftp_connection(settings: FTPSettings):
    """Test FTP connection"""
    import ftplib
    from contextlib import closing
    
    try:
        if settings.protocol == "FTP":
            with closing(ftplib.FTP()) as ftp:
                ftp.connect(settings.host, settings.port, timeout=10)
                ftp.login(settings.username, settings.password)
                
                # Try to change to root folder if specified
                if settings.rootFolder:
                    ftp.cwd(settings.rootFolder)
                
                return {
                    "success": True,
                    "message": f"Successfully connected to {settings.host}"
                }
        else:
            # For FTPS/SFTP, we'd need additional libraries
            return {
                "success": False,
                "message": f"{settings.protocol} not yet implemented. Please use FTP for now."
            }
    except ftplib.error_perm as e:
        raise HTTPException(status_code=401, detail=f"Authentication failed: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Connection failed: {str(e)}")


class FTPPublishRequest(BaseModel):
    ftpSettings: FTPSettings
    onlyChanges: Optional[bool] = False


@api_router.post("/sites/{site_id}/publish-ftp")
async def publish_site_via_ftp(site_id: str, request: FTPPublishRequest):
    """Publish site via FTP - Upload HTML files, CSS, and images to FTP server"""
    import ftplib
    from contextlib import closing
    import io
    
    site = await db.sites.find_one({"id": site_id}, {"_id": 0})
    
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")
    
    ftp_settings = request.ftpSettings
    
    # Validate FTP settings
    if not ftp_settings.host or not ftp_settings.username:
        raise HTTPException(
            status_code=400, 
            detail="FTP settings incomplete. Please configure FTP in FTP Manager first."
        )
    
    try:
        uploaded_files = []
        
        # Only FTP is supported for now
        if ftp_settings.protocol != "FTP":
            raise HTTPException(
                status_code=400,
                detail=f"{ftp_settings.protocol} not yet implemented. Please use FTP for now."
            )
        
        # Collect all images from all pages
        all_images = set()
        for page in site.get('pages', []):
            images = extract_image_urls_from_page(page)
            all_images.update(images)
        
        # Connect to FTP server
        with closing(ftplib.FTP()) as ftp:
            # Connect
            ftp.connect(ftp_settings.host, ftp_settings.port, timeout=30)
            
            # Login
            ftp.login(ftp_settings.username, ftp_settings.password)
            
            # Change to root folder if specified
            if ftp_settings.rootFolder:
                try:
                    ftp.cwd(ftp_settings.rootFolder)
                except ftplib.error_perm:
                    # Try to create the folder if it doesn't exist
                    try:
                        ftp.mkd(ftp_settings.rootFolder)
                        ftp.cwd(ftp_settings.rootFolder)
                    except Exception as e:
                        raise HTTPException(
                            status_code=400,
                            detail=f"Cannot access or create root folder '{ftp_settings.rootFolder}': {str(e)}"
                        )
            
            # Create images directory on FTP if there are images
            if all_images:
                try:
                    ftp.mkd('images')
                except ftplib.error_perm:
                    # Directory already exists, that's fine
                    pass
            
            # Upload images
            for image_url in all_images:
                try:
                    # Extract filename from URL
                    filename = image_url.split('/uploads/')[-1]
                    local_path = UPLOAD_DIR / filename
                    
                    # Check if file exists locally
                    if local_path.exists():
                        with open(local_path, 'rb') as img_file:
                            ftp.storbinary(f'STOR images/{filename}', img_file)
                        uploaded_files.append(f'images/{filename}')
                except Exception as img_error:
                    # Log but don't fail - continue uploading other files
                    logger.warning(f"Failed to upload image {filename}: {str(img_error)}")
            
            # Generate and upload CSS file
            css_content = generate_css_file()
            css_buffer = io.BytesIO(css_content.encode('utf-8'))
            ftp.storbinary('STOR styles.css', css_buffer)
            uploaded_files.append('styles.css')
            
            # Upload each page as HTML file (with external CSS)
            for page in site.get('pages', []):
                # Generate HTML content with external CSS
                html_content = generate_html_export(page, site['name'], use_external_css=True)
                
                # Get filename
                page_filename = page.get('pageUrl', f"{page['name'].lower().replace(' ', '-')}.html")
                
                # Ensure first page is also saved as index.html
                if page == site.get('pages', [])[0] and page_filename != 'index.html':
                    # Upload with both names
                    file_buffer = io.BytesIO(html_content.encode('utf-8'))
                    ftp.storbinary(f'STOR {page_filename}', file_buffer)
                    uploaded_files.append(page_filename)
                    
                    # Also upload as index.html
                    file_buffer = io.BytesIO(html_content.encode('utf-8'))
                    ftp.storbinary('STOR index.html', file_buffer)
                    uploaded_files.append('index.html')
                else:
                    # Upload file
                    file_buffer = io.BytesIO(html_content.encode('utf-8'))
                    ftp.storbinary(f'STOR {page_filename}', file_buffer)
                    uploaded_files.append(page_filename)
                
            # Close connection
            ftp.quit()
        
        return {
            "success": True,
            "message": "Site published successfully via FTP!",
            "uploaded_files": uploaded_files,
            "total_files": len(uploaded_files),
            "host": ftp_settings.host,
            "folder": ftp_settings.rootFolder or "/",
            "images_uploaded": len([f for f in uploaded_files if f.startswith('images/')])
        }
        
    except ftplib.error_perm as e:
        raise HTTPException(status_code=401, detail=f"FTP Authentication failed: {str(e)}")
    except ftplib.error_temp as e:
        raise HTTPException(status_code=503, detail=f"FTP Temporary error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"FTP publish failed: {str(e)}")


# ============= SITE STYLES ENDPOINTS =============

@api_router.get("/sites/{site_id}/styles", response_model=SiteStyles)
async def get_site_styles(site_id: str):
    """Get site styles (colors, fonts, options, customCSS)"""
    site = await db.sites.find_one({"id": site_id}, {"_id": 0})
    
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")
    
    # Return site styles, or default if not present
    if 'siteStyles' in site:
        return SiteStyles(**site['siteStyles'])
    else:
        return SiteStyles()


@api_router.put("/sites/{site_id}/styles", response_model=SiteStyles)
async def update_site_styles(site_id: str, styles: SiteStyles):
    """Update site styles"""
    site = await db.sites.find_one({"id": site_id}, {"_id": 0})
    
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")
    
    # Convert styles to dict
    styles_dict = styles.model_dump()
    
    # Update site styles
    result = await db.sites.update_one(
        {"id": site_id},
        {
            "$set": {
                "siteStyles": styles_dict,
                "updatedAt": datetime.now(timezone.utc).isoformat()
            }
        }
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Site not found")
    
    return styles


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()