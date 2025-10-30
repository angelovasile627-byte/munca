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
  'image-video': [
    {
      id: 'image-1',
      name: 'Image Gallery',
      thumbnail: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=200&fit=crop',
      html: '<section style="padding: 4rem 2rem; background: #f7fafc;"><div style="max-width: 1200px; margin: 0 auto;"><h2 style="font-size: 2.5rem; text-align: center; margin-bottom: 3rem; color: #1a202c;">Our Gallery</h2><div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;"><div style="aspect-ratio: 1; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px;"></div><div style="aspect-ratio: 1; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 8px;"></div><div style="aspect-ratio: 1; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 8px;"></div></div></div></section>',
      css: ''
    }
  ],
  gallery: [
    {
      id: 'gallery-1',
      name: 'Photo Slider',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
      html: '<section style="padding: 4rem 2rem; background: white;"><div style="max-width: 1200px; margin: 0 auto;"><div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 500px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">Slide 1</div></div></section>',
      css: ''
    }
  ],
  people: [
    {
      id: 'people-1',
      name: 'Team Section',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=200&fit=crop',
      html: '<section style="padding: 4rem 2rem; background: #f7fafc;"><div style="max-width: 1200px; margin: 0 auto;"><h2 style="font-size: 2.5rem; text-align: center; margin-bottom: 3rem; color: #1a202c;">Our Team</h2><div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;"><div style="background: white; padding: 2rem; border-radius: 12px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"><div style="width: 100px; height: 100px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; margin: 0 auto 1rem;"></div><h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: #1a202c;">John Doe</h3><p style="color: #718096;">CEO & Founder</p></div><div style="background: white; padding: 2rem; border-radius: 12px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"><div style="width: 100px; height: 100px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 50%; margin: 0 auto 1rem;"></div><h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: #1a202c;">Jane Smith</h3><p style="color: #718096;">CTO</p></div><div style="background: white; padding: 2rem; border-radius: 12px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"><div style="width: 100px; height: 100px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 50%; margin: 0 auto 1rem;"></div><h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: #1a202c;">Mike Johnson</h3><p style="color: #718096;">Lead Designer</p></div></div></div></section>',
      css: ''
    }
  ],
  contact: [
    {
      id: 'contact-1',
      name: 'Contact Form',
      thumbnail: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400&h=200&fit=crop',
      html: '<section style="padding: 4rem 2rem; background: white;"><div style="max-width: 600px; margin: 0 auto;"><h2 style="font-size: 2.5rem; text-align: center; margin-bottom: 3rem; color: #1a202c;">Get In Touch</h2><form style="display: flex; flex-direction: column; gap: 1.5rem;"><input type="text" placeholder="Your Name" style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 1rem;"><input type="email" placeholder="Your Email" style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 1rem;"><textarea placeholder="Your Message" rows="5" style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 1rem; resize: vertical;"></textarea><button type="submit" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1rem 2rem; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: 600; cursor: pointer;">Send Message</button></form></div></section>',
      css: 'button:hover { transform: scale(1.02); transition: transform 0.2s; }'
    }
  ],
  social: [
    {
      id: 'social-1',
      name: 'Social Links',
      thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=200&fit=crop',
      html: '<section style="padding: 3rem 2rem; background: #f7fafc;"><div style="max-width: 600px; margin: 0 auto; text-align: center;"><h2 style="font-size: 2rem; margin-bottom: 2rem; color: #1a202c;">Follow Us</h2><div style="display: flex; justify-content: center; gap: 1rem;"><a href="#" style="width: 50px; height: 50px; background: #1DA1F2; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; font-weight: bold;">T</a><a href="#" style="width: 50px; height: 50px; background: #4267B2; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; font-weight: bold;">F</a><a href="#" style="width: 50px; height: 50px; background: #E1306C; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; font-weight: bold;">I</a><a href="#" style="width: 50px; height: 50px; background: #0077B5; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; font-weight: bold;">L</a></div></div></section>',
      css: 'a:hover { transform: scale(1.1); transition: transform 0.2s; }'
    }
  ],
  form: [
    {
      id: 'form-1',
      name: 'Newsletter Signup',
      thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop',
      html: '<section style="padding: 4rem 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"><div style="max-width: 600px; margin: 0 auto; text-align: center;"><h2 style="font-size: 2.5rem; margin-bottom: 1rem; color: white;">Subscribe to Our Newsletter</h2><p style="color: rgba(255,255,255,0.9); margin-bottom: 2rem; font-size: 1.125rem;">Get the latest updates and offers directly in your inbox.</p><form style="display: flex; gap: 1rem;"><input type="email" placeholder="Enter your email" style="flex: 1; padding: 1rem; border: none; border-radius: 8px; font-size: 1rem;"><button type="submit" style="background: white; color: #667eea; padding: 1rem 2rem; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Subscribe</button></form></div></section>',
      css: ''
    }
  ],
  list: [
    {
      id: 'list-1',
      name: 'Feature List',
      thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=200&fit=crop',
      html: '<section style="padding: 4rem 2rem; background: white;"><div style="max-width: 800px; margin: 0 auto;"><h2 style="font-size: 2.5rem; margin-bottom: 2rem; color: #1a202c;">Why Choose Us</h2><ul style="list-style: none; padding: 0;"><li style="display: flex; align-items: start; gap: 1rem; margin-bottom: 1.5rem;"><div style="width: 30px; height: 30px; background: #48BB78; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">✓</div><div><h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #1a202c;">Quality First</h3><p style="color: #4a5568;">We prioritize quality in everything we do</p></div></li><li style="display: flex; align-items: start; gap: 1rem; margin-bottom: 1.5rem;"><div style="width: 30px; height: 30px; background: #48BB78; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">✓</div><div><h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #1a202c;">Customer Support</h3><p style="color: #4a5568;">24/7 dedicated support team</p></div></li><li style="display: flex; align-items: start; gap: 1rem;"><div style="width: 30px; height: 30px; background: #48BB78; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">✓</div><div><h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #1a202c;">Fast Delivery</h3><p style="color: #4a5568;">Quick turnaround times guaranteed</p></div></li></ul></div></section>',
      css: ''
    }
  ],
  numbers: [
    {
      id: 'numbers-1',
      name: 'Statistics',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
      html: '<section style="padding: 4rem 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"><div style="max-width: 1200px; margin: 0 auto;"><div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; text-align: center;"><div><div style="font-size: 3rem; font-weight: bold; color: white; margin-bottom: 0.5rem;">500+</div><p style="color: rgba(255,255,255,0.9); font-size: 1.125rem;">Projects</p></div><div><div style="font-size: 3rem; font-weight: bold; color: white; margin-bottom: 0.5rem;">1000+</div><p style="color: rgba(255,255,255,0.9); font-size: 1.125rem;">Clients</p></div><div><div style="font-size: 3rem; font-weight: bold; color: white; margin-bottom: 0.5rem;">50+</div><p style="color: rgba(255,255,255,0.9); font-size: 1.125rem;">Awards</p></div><div><div style="font-size: 3rem; font-weight: bold; color: white; margin-bottom: 0.5rem;">99%</div><p style="color: rgba(255,255,255,0.9); font-size: 1.125rem;">Satisfaction</p></div></div></div></section>',
      css: ''
    }
  ],
  pricing: [
    {
      id: 'pricing-1',
      name: 'Pricing Table',
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop',
      html: '<section style="padding: 4rem 2rem; background: #f7fafc;"><div style="max-width: 1200px; margin: 0 auto;"><h2 style="font-size: 2.5rem; text-align: center; margin-bottom: 3rem; color: #1a202c;">Choose Your Plan</h2><div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;"><div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center;"><h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #1a202c;">Basic</h3><div style="font-size: 3rem; font-weight: bold; color: #667eea; margin-bottom: 1rem;">$9<span style="font-size: 1rem; color: #718096;">/mo</span></div><ul style="list-style: none; padding: 0; margin-bottom: 2rem; text-align: left;"><li style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">✓ 10 Projects</li><li style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">✓ 5GB Storage</li><li style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">✓ Basic Support</li></ul><button style="background: #667eea; color: white; width: 100%; padding: 1rem; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Get Started</button></div><div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 12px; box-shadow: 0 8px 16px rgba(0,0,0,0.2); text-align: center; transform: scale(1.05);"><h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: white;">Pro</h3><div style="font-size: 3rem; font-weight: bold; color: white; margin-bottom: 1rem;">$29<span style="font-size: 1rem; opacity: 0.9;">/mo</span></div><ul style="list-style: none; padding: 0; margin-bottom: 2rem; text-align: left; color: white;"><li style="padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.2);">✓ Unlimited Projects</li><li style="padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.2);">✓ 50GB Storage</li><li style="padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.2);">✓ Priority Support</li></ul><button style="background: white; color: #667eea; width: 100%; padding: 1rem; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Get Started</button></div><div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center;"><h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #1a202c;">Enterprise</h3><div style="font-size: 3rem; font-weight: bold; color: #667eea; margin-bottom: 1rem;">$99<span style="font-size: 1rem; color: #718096;">/mo</span></div><ul style="list-style: none; padding: 0; margin-bottom: 2rem; text-align: left;"><li style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">✓ Unlimited Everything</li><li style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">✓ 500GB Storage</li><li style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">✓ 24/7 Dedicated Support</li></ul><button style="background: #667eea; color: white; width: 100%; padding: 1rem; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Get Started</button></div></div></div></section>',
      css: 'button:hover { transform: scale(1.05); transition: transform 0.2s; }'
    }
  ],
  news: [
    {
      id: 'news-1',
      name: 'News Grid',
      thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=200&fit=crop',
      html: '<section style="padding: 4rem 2rem; background: white;"><div style="max-width: 1200px; margin: 0 auto;"><h2 style="font-size: 2.5rem; margin-bottom: 3rem; color: #1a202c;">Latest News</h2><div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;"><article style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;"><div style="height: 200px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div><div style="padding: 1.5rem;"><p style="color: #718096; font-size: 0.875rem; margin-bottom: 0.5rem;">January 15, 2024</p><h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #1a202c;">New Product Launch</h3><p style="color: #4a5568; margin-bottom: 1rem;">Exciting new features coming soon...</p><a href="#" style="color: #667eea; font-weight: 600; text-decoration: none;">Read More →</a></div></article><article style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;"><div style="height: 200px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);"></div><div style="padding: 1.5rem;"><p style="color: #718096; font-size: 0.875rem; margin-bottom: 0.5rem;">January 12, 2024</p><h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #1a202c;">Company Update</h3><p style="color: #4a5568; margin-bottom: 1rem;">Latest from our team...</p><a href="#" style="color: #667eea; font-weight: 600; text-decoration: none;">Read More →</a></div></article><article style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;"><div style="height: 200px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);"></div><div style="padding: 1.5rem;"><p style="color: #718096; font-size: 0.875rem; margin-bottom: 0.5rem;">January 10, 2024</p><h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #1a202c;">Industry Insights</h3><p style="color: #4a5568; margin-bottom: 1rem;">Expert analysis and trends...</p><a href="#" style="color: #667eea; font-weight: 600; text-decoration: none;">Read More →</a></div></article></div></div></section>',
      css: ''
    }
  ],
  chat: [
    {
      id: 'chat-1',
      name: 'Chat Widget',
      thumbnail: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=400&h=200&fit=crop',
      html: '<div style="position: fixed; bottom: 20px; right: 20px; background: white; width: 350px; height: 500px; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.2); display: flex; flex-direction: column;"><div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1.5rem; border-radius: 12px 12px 0 0; color: white;"><h3 style="font-size: 1.25rem; margin: 0;">Live Chat</h3><p style="margin: 0.25rem 0 0; opacity: 0.9;">We are online!</p></div><div style="flex: 1; padding: 1rem; overflow-y: auto; background: #f7fafc;"><div style="background: white; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; max-width: 80%;"><p style="margin: 0; color: #1a202c;">Hello! How can we help you today?</p></div></div><div style="padding: 1rem; border-top: 1px solid #e2e8f0;"><input type="text" placeholder="Type your message..." style="width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 8px;"></div></div>',
      css: ''
    }
  ],
  html: [
    {
      id: 'html-1',
      name: 'Custom HTML',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop',
      html: '<section style="padding: 4rem 2rem; background: #1a202c; text-align: center;"><div style="max-width: 800px; margin: 0 auto;"><pre style="background: #2d3748; color: #68d391; padding: 2rem; border-radius: 8px; text-align: left; overflow-x: auto;"><code>&lt;div class="custom-code"&gt;\n  &lt;h1&gt;Add Your Custom HTML&lt;/h1&gt;\n  &lt;p&gt;Edit this block to add your code&lt;/p&gt;\n&lt;/div&gt;</code></pre></div></section>',
      css: ''
    }
  ],
  extensions: [
    {
      id: 'extension-1',
      name: 'Testimonials',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=200&fit=crop',
      html: '<section style="padding: 4rem 2rem; background: white;"><div style="max-width: 1200px; margin: 0 auto;"><h2 style="font-size: 2.5rem; text-align: center; margin-bottom: 3rem; color: #1a202c;">What Our Clients Say</h2><div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;"><div style="background: #f7fafc; padding: 2rem; border-radius: 12px; border-left: 4px solid #667eea;"><p style="font-size: 1.125rem; color: #4a5568; margin-bottom: 1rem; font-style: italic;">"Amazing service! They exceeded all our expectations and delivered a perfect product."</p><div style="display: flex; align-items: center; gap: 1rem;"><div style="width: 50px; height: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%;"></div><div><p style="font-weight: 600; color: #1a202c; margin: 0;">Sarah Johnson</p><p style="color: #718096; font-size: 0.875rem; margin: 0;">CEO, TechCorp</p></div></div></div><div style="background: #f7fafc; padding: 2rem; border-radius: 12px; border-left: 4px solid #f093fb;"><p style="font-size: 1.125rem; color: #4a5568; margin-bottom: 1rem; font-style: italic;">"Professional, responsive, and results-driven. Highly recommend their services!"</p><div style="display: flex; align-items: center; gap: 1rem;"><div style="width: 50px; height: 50px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 50%;"></div><div><p style="font-weight: 600; color: #1a202c; margin: 0;">Michael Chen</p><p style="color: #718096; font-size: 0.875rem; margin: 0;">Founder, StartupXYZ</p></div></div></div></div></div></section>',
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