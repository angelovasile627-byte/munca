// Mock data for block templates

export const blockCategories = [
  { id: 'menu', name: 'Menu', icon: 'Menu' },
  { id: 'header', name: 'Header', icon: 'Heading' },
  { id: 'features', name: 'Features', icon: 'Star' },
  { id: 'article', name: 'Article', icon: 'FileText' },
  { id: 'image-video', name: 'Image & Video', icon: 'Image' },
  { id: 'gallery', name: 'Gallery & Slider', icon: 'Images' },
  { id: 'people', name: 'People', icon: 'Users' },
  { id: 'contact', name: 'Contact', icon: 'Mail' },
  { id: 'social', name: 'Social', icon: 'Share2' },
  { id: 'footer', name: 'Footer', icon: 'Layout' },
  { id: 'form', name: 'Form', icon: 'FormInput' },
  { id: 'list', name: 'List', icon: 'List' },
  { id: 'numbers', name: 'Numbers', icon: 'Hash' },
  { id: 'pricing', name: 'Pricing', icon: 'DollarSign' },
  { id: 'news', name: 'News', icon: 'Newspaper' },
  { id: 'chat', name: 'Chat', icon: 'MessageCircle' },
  { id: 'html', name: 'HTML', icon: 'Code' },
  { id: 'extensions', name: 'Extensions', icon: 'Puzzle' }
];

export const blockTemplates = {
  menu: [
    {
      id: 'menu-1',
      name: 'Classic Menu',
      thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=200&fit=crop',
      html: '<nav style="background: #2B2E33; padding: 1rem;"><div style="display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto;"><div style="color: white; font-size: 1.5rem; font-weight: bold;">Logo</div><ul style="display: flex; gap: 2rem; list-style: none; margin: 0; padding: 0;"><li><a href="#" style="color: white; text-decoration: none;">Home</a></li><li><a href="#" style="color: white; text-decoration: none;">About</a></li><li><a href="#" style="color: white; text-decoration: none;">Services</a></li><li><a href="#" style="color: white; text-decoration: none;">Contact</a></li></ul></div></nav>',
      css: 'nav a:hover { opacity: 0.8; }'
    },
    {
      id: 'menu-2',
      name: 'Transparent Menu',
      thumbnail: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=200&fit=crop',
      html: '<nav style="background: rgba(0,0,0,0.5); padding: 1rem; backdrop-filter: blur(10px);"><div style="display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto;"><div style="color: white; font-size: 1.5rem; font-weight: bold;">Brand</div><ul style="display: flex; gap: 2rem; list-style: none; margin: 0; padding: 0;"><li><a href="#" style="color: white; text-decoration: none;">Home</a></li><li><a href="#" style="color: white; text-decoration: none;">Portfolio</a></li><li><a href="#" style="color: white; text-decoration: none;">Blog</a></li><li><a href="#" style="color: white; text-decoration: none;">Contact</a></li></ul></div></nav>',
      css: 'nav a { transition: color 0.3s; } nav a:hover { color: #FFD700; }'
    }
  ],
  header: [
    {
      id: 'header-1',
      name: 'Hero with Image',
      thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop',
      html: '<header style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 6rem 2rem; text-align: center; color: white;"><h1 style="font-size: 3rem; margin-bottom: 1rem; font-weight: bold;">Create, Connect, Shine</h1><p style="font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9;">Build your dream website with our powerful builder</p><button style="background: white; color: #667eea; padding: 1rem 2rem; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: 600; cursor: pointer;">Get Started</button></header>',
      css: 'button:hover { transform: scale(1.05); transition: transform 0.2s; }'
    },
    {
      id: 'header-2',
      name: 'Experience the Future',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop',
      html: '<header style="background: linear-gradient(to right, #0f2027, #203a43, #2c5364); padding: 6rem 2rem; color: white;"><div style="max-width: 1200px; margin: 0 auto;"><h1 style="font-size: 3.5rem; margin-bottom: 1rem; font-weight: bold;">Experience the Future</h1><p style="font-size: 1.5rem; margin-bottom: 2rem; color: rgba(255,255,255,0.8);">Innovation meets design in perfect harmony</p><div style="display: flex; gap: 1rem;"><button style="background: #00d4ff; color: black; padding: 1rem 2rem; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Learn More</button><button style="background: transparent; color: white; padding: 1rem 2rem; border: 2px solid white; border-radius: 8px; font-weight: 600; cursor: pointer;">Watch Video</button></div></div></header>',
      css: 'button { transition: all 0.3s; } button:hover { transform: translateY(-2px); }'
    },
    {
      id: 'header-3',
      name: 'Modern Hero',
      thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=200&fit=crop',
      html: '<header style="background: #ffffff; padding: 6rem 2rem;"><div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;"><div><h1 style="font-size: 3rem; margin-bottom: 1rem; color: #1a202c; font-weight: bold;">Build Amazing Websites</h1><p style="font-size: 1.25rem; color: #4a5568; margin-bottom: 2rem;">No coding required. Just drag, drop and publish.</p><button style="background: #5a67d8; color: white; padding: 1rem 2.5rem; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Start Building</button></div><div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 400px; border-radius: 12px;"></div></div></header>',
      css: 'button:hover { background: #4c51bf; transition: background 0.2s; }'
    }
  ],
  features: [
    {
      id: 'features-1',
      name: 'Feature Grid',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=200&fit=crop',
      html: '<section style="padding: 4rem 2rem; background: #f7fafc;"><div style="max-width: 1200px; margin: 0 auto;"><h2 style="font-size: 2.5rem; text-align: center; margin-bottom: 3rem; color: #1a202c;">Our Features</h2><div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;"><div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"><div style="width: 60px; height: 60px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; margin-bottom: 1rem;"></div><h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: #1a202c;">Easy to Use</h3><p style="color: #4a5568;">Intuitive drag and drop interface</p></div><div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"><div style="width: 60px; height: 60px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 12px; margin-bottom: 1rem;"></div><h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: #1a202c;">Responsive</h3><p style="color: #4a5568;">Works perfectly on all devices</p></div><div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"><div style="width: 60px; height: 60px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 12px; margin-bottom: 1rem;"></div><h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: #1a202c;">Fast Performance</h3><p style="color: #4a5568;">Optimized for speed and efficiency</p></div></div></div></section>',
      css: 'div:hover { transform: translateY(-5px); transition: transform 0.3s; }'
    }
  ],
  article: [
    {
      id: 'article-1',
      name: 'Blog Post',
      thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=200&fit=crop',
      html: '<article style="padding: 4rem 2rem; background: white;"><div style="max-width: 800px; margin: 0 auto;"><h2 style="font-size: 2.5rem; margin-bottom: 1rem; color: #1a202c;">The Future of Web Design</h2><p style="color: #718096; margin-bottom: 2rem;">Published on January 15, 2024</p><p style="font-size: 1.125rem; line-height: 1.8; color: #4a5568; margin-bottom: 1rem;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p><p style="font-size: 1.125rem; line-height: 1.8; color: #4a5568;">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p></div></article>',
      css: ''
    }
  ],
  footer: [
    {
      id: 'footer-1',
      name: 'Simple Footer',
      thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=200&fit=crop',
      html: '<footer style="background: #2d3748; padding: 3rem 2rem; color: white;"><div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem;"><div><h3 style="font-size: 1.25rem; margin-bottom: 1rem;">Company</h3><ul style="list-style: none; padding: 0;"><li style="margin-bottom: 0.5rem;"><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none;">About Us</a></li><li style="margin-bottom: 0.5rem;"><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none;">Careers</a></li><li style="margin-bottom: 0.5rem;"><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none;">Contact</a></li></ul></div><div><h3 style="font-size: 1.25rem; margin-bottom: 1rem;">Products</h3><ul style="list-style: none; padding: 0;"><li style="margin-bottom: 0.5rem;"><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none;">Features</a></li><li style="margin-bottom: 0.5rem;"><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none;">Pricing</a></li><li style="margin-bottom: 0.5rem;"><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none;">API</a></li></ul></div><div><h3 style="font-size: 1.25rem; margin-bottom: 1rem;">Resources</h3><ul style="list-style: none; padding: 0;"><li style="margin-bottom: 0.5rem;"><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none;">Documentation</a></li><li style="margin-bottom: 0.5rem;"><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none;">Guides</a></li><li style="margin-bottom: 0.5rem;"><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none;">Blog</a></li></ul></div><div><h3 style="font-size: 1.25rem; margin-bottom: 1rem;">Legal</h3><ul style="list-style: none; padding: 0;"><li style="margin-bottom: 0.5rem;"><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none;">Privacy</a></li><li style="margin-bottom: 0.5rem;"><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none;">Terms</a></li><li style="margin-bottom: 0.5rem;"><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none;">Cookie Policy</a></li></ul></div></div><div style="max-width: 1200px; margin: 2rem auto 0; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1); text-align: center; color: rgba(255,255,255,0.6);">© 2024 Your Company. All rights reserved.</div></footer>',
      css: 'footer a:hover { color: white; transition: color 0.2s; }'
    }
  ]
};

export const themes = [
  { id: 'startm5', name: 'StartM5', color: '#FF6B6B' },
  { id: 'mobirise5', name: 'Mobirise 5', color: '#4ECDC4' },
  { id: 'colorm', name: 'ColorM', color: '#95E1D3' },
  { id: 'lawyerm', name: 'LawyerM', color: '#2C3E50' },
  { id: 'eventm', name: 'EventM', color: '#9B59B6' }
];

export const mockProjects = [
  {
    id: '1',
    name: 'My Portfolio',
    lastModified: new Date('2024-01-20'),
    blocks: []
  },
  {
    id: '2',
    name: 'Business Site',
    lastModified: new Date('2024-01-18'),
    blocks: []
  }
];