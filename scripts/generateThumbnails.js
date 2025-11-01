const fs = require('fs');
const path = require('path');

// Funcție pentru a genera SVG thumbnail pentru un meniu
function generateMenuThumbnail(config) {
  const { logo, links, buttonText, style, width = 360, height = 60 } = config;
  
  // Stiluri diferite pentru meniuri
  const styles = {
    light: {
      bg: '#FFFFFF',
      text: '#333333',
      linkText: '#666666',
      buttonBg: '#4F46E5',
      buttonText: '#FFFFFF'
    },
    dark: {
      bg: '#1F2937',
      text: '#FFFFFF',
      linkText: '#D1D5DB',
      buttonBg: '#EF4444',
      buttonText: '#FFFFFF'
    },
    gradient: {
      bg: 'url(#grad1)',
      text: '#FFFFFF',
      linkText: '#F3F4F6',
      buttonBg: '#10B981',
      buttonText: '#FFFFFF'
    },
    minimal: {
      bg: '#F9FAFB',
      text: '#111827',
      linkText: '#6B7280',
      buttonBg: '#6366F1',
      buttonText: '#FFFFFF'
    },
    colored: {
      bg: '#7C3AED',
      text: '#FFFFFF',
      linkText: '#E9D5FF',
      buttonBg: '#FBBF24',
      buttonText: '#1F2937'
    },
    modern: {
      bg: '#0F172A',
      text: '#F1F5F9',
      linkText: '#94A3B8',
      buttonBg: '#06B6D4',
      buttonText: '#FFFFFF'
    }
  };

  const currentStyle = styles[style] || styles.light;
  const linkSpacing = 60;
  const startX = 120;

  let svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="${currentStyle.bg.startsWith('url') ? 'url(#grad1)' : currentStyle.bg}"/>
  
  <!-- Logo -->
  <text x="20" y="${height/2 + 6}" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="${currentStyle.text}">
    ${logo}
  </text>
  
  <!-- Links -->`;

  links.forEach((link, index) => {
    svgContent += `
  <text x="${startX + (index * linkSpacing)}" y="${height/2 + 5}" font-family="Arial, sans-serif" font-size="12" fill="${currentStyle.linkText}">
    ${link.text}
  </text>`;
  });

  // Button
  const buttonX = width - 100;
  svgContent += `
  
  <!-- Button -->
  <rect x="${buttonX}" y="${height/2 - 15}" width="85" height="30" rx="15" fill="${currentStyle.buttonBg}"/>
  <text x="${buttonX + 42.5}" y="${height/2 + 5}" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="${currentStyle.buttonText}" text-anchor="middle">
    ${buttonText}
  </text>
</svg>`;

  return svgContent;
}

// Funcție pentru a genera SVG thumbnail pentru header
function generateHeaderThumbnail(config) {
  const { title, subtitle, buttonText, style, width = 360, height = 180 } = config;
  
  const styles = {
    gradient1: { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', text: '#FFFFFF' },
    gradient2: { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', text: '#FFFFFF' },
    gradient3: { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', text: '#FFFFFF' },
    gradient4: { bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', text: '#FFFFFF' },
    gradient5: { bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', text: '#FFFFFF' },
    dark: { bg: '#1F2937', text: '#FFFFFF' },
    light: { bg: '#F9FAFB', text: '#111827' },
    purple: { bg: '#7C3AED', text: '#FFFFFF' },
    blue: { bg: '#2563EB', text: '#FFFFFF' },
    green: { bg: '#059669', text: '#FFFFFF' }
  };

  const currentStyle = styles[style] || styles.gradient1;
  const bgColor = style.startsWith('gradient') ? `url(#headerGrad${style.replace('gradient', '')})` : currentStyle.bg;

  let gradientDef = '';
  if (style === 'gradient1') {
    gradientDef = `<linearGradient id="headerGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>`;
  } else if (style === 'gradient2') {
    gradientDef = `<linearGradient id="headerGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f093fb;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f5576c;stop-opacity:1" />
    </linearGradient>`;
  } else if (style === 'gradient3') {
    gradientDef = `<linearGradient id="headerGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4facfe;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#00f2fe;stop-opacity:1" />
    </linearGradient>`;
  } else if (style === 'gradient4') {
    gradientDef = `<linearGradient id="headerGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#43e97b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#38f9d7;stop-opacity:1" />
    </linearGradient>`;
  } else if (style === 'gradient5') {
    gradientDef = `<linearGradient id="headerGrad5" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#fa709a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#fee140;stop-opacity:1" />
    </linearGradient>`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${gradientDef}
  </defs>
  
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="${bgColor}"/>
  
  <!-- Title -->
  <text x="${width/2}" y="80" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${currentStyle.text}" text-anchor="middle">
    ${title}
  </text>
  
  <!-- Subtitle -->
  <text x="${width/2}" y="110" font-family="Arial, sans-serif" font-size="14" fill="${currentStyle.text}" text-anchor="middle" opacity="0.9">
    ${subtitle}
  </text>
  
  <!-- Button -->
  <rect x="${width/2 - 50}" y="130" width="100" height="35" rx="17.5" fill="#FFFFFF" opacity="0.3"/>
  <rect x="${width/2 - 48}" y="132" width="96" height="31" rx="15.5" fill="${currentStyle.text}" opacity="0.2"/>
  <text x="${width/2}" y="153" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="${currentStyle.text}" text-anchor="middle">
    ${buttonText}
  </text>
</svg>`;
}

// Configurații pentru 20 de meniuri
const menuConfigs = [
  { id: 1, logo: 'Mobirise', links: [{text: 'About'}, {text: 'Services'}, {text: 'Contacts'}], buttonText: 'Start Now!', style: 'light' },
  { id: 2, logo: 'LOGO', links: [{text: 'Home'}, {text: 'About'}, {text: 'Services'}, {text: 'Contact'}], buttonText: 'Get Started', style: 'dark' },
  { id: 3, logo: 'BRAND', links: [{text: 'Features'}, {text: 'Pricing'}, {text: 'About'}], buttonText: 'Sign Up', style: 'gradient' },
  { id: 4, logo: 'COMPANY', links: [{text: 'Products'}, {text: 'Solutions'}, {text: 'Support'}], buttonText: 'Contact', style: 'minimal' },
  { id: 5, logo: 'STUDIO', links: [{text: 'Portfolio'}, {text: 'Services'}, {text: 'Blog'}], buttonText: 'Hire Us', style: 'colored' },
  { id: 6, logo: 'AGENCY', links: [{text: 'Work'}, {text: 'About'}, {text: 'Contact'}], buttonText: 'Start Project', style: 'modern' },
  { id: 7, logo: 'CREATIVE', links: [{text: 'Services'}, {text: 'Portfolio'}, {text: 'Team'}], buttonText: 'Get Quote', style: 'light' },
  { id: 8, logo: 'DIGITAL', links: [{text: 'Solutions'}, {text: 'Cases'}, {text: 'Insights'}], buttonText: 'Learn More', style: 'dark' },
  { id: 9, logo: 'TECH', links: [{text: 'Products'}, {text: 'Features'}, {text: 'Pricing'}], buttonText: 'Try Free', style: 'gradient' },
  { id: 10, logo: 'START', links: [{text: 'Home'}, {text: 'Features'}, {text: 'Pricing'}], buttonText: 'Sign Up', style: 'minimal' },
  { id: 11, logo: 'BIZZ', links: [{text: 'Services'}, {text: 'About'}, {text: 'Contact'}], buttonText: 'Get Started', style: 'colored' },
  { id: 12, logo: 'PRO', links: [{text: 'Features'}, {text: 'Docs'}, {text: 'Support'}], buttonText: 'Download', style: 'modern' },
  { id: 13, logo: 'WAVE', links: [{text: 'Solutions'}, {text: 'Pricing'}, {text: 'Blog'}], buttonText: 'Contact Us', style: 'light' },
  { id: 14, logo: 'NEXT', links: [{text: 'Home'}, {text: 'About'}, {text: 'Services'}], buttonText: 'Join Now', style: 'dark' },
  { id: 15, logo: 'FLEX', links: [{text: 'Products'}, {text: 'Pricing'}, {text: 'FAQ'}], buttonText: 'Buy Now', style: 'gradient' },
  { id: 16, logo: 'CORE', links: [{text: 'Features'}, {text: 'Team'}, {text: 'Contact'}], buttonText: 'Get Demo', style: 'minimal' },
  { id: 17, logo: 'SPARK', links: [{text: 'About'}, {text: 'Work'}, {text: 'Blog'}], buttonText: 'Hire Us', style: 'colored' },
  { id: 18, logo: 'PIXEL', links: [{text: 'Portfolio'}, {text: 'Services'}, {text: 'Contact'}], buttonText: 'Start Now', style: 'modern' },
  { id: 19, logo: 'ZOOM', links: [{text: 'Features'}, {text: 'Pricing'}, {text: 'Resources'}], buttonText: 'Sign Up', style: 'light' },
  { id: 20, logo: 'APEX', links: [{text: 'Solutions'}, {text: 'Cases'}, {text: 'About'}], buttonText: 'Contact', style: 'dark' }
];

// Configurații pentru 15 headere
const headerConfigs = [
  { id: 1, title: 'Create, connect, shine', subtitle: 'Make your own website in a few clicks', buttonText: 'Start Free', style: 'gradient1' },
  { id: 2, title: 'Experience the future', subtitle: 'Do what you love doing with ease', buttonText: 'Contact Us', style: 'gradient2' },
  { id: 3, title: 'Build Amazing Sites', subtitle: 'Professional websites made simple', buttonText: 'Get Started', style: 'gradient3' },
  { id: 4, title: 'Your Vision, Our Code', subtitle: 'Transform ideas into reality', buttonText: 'Learn More', style: 'gradient4' },
  { id: 5, title: 'Design Without Limits', subtitle: 'Creativity meets simplicity', buttonText: 'Try Now', style: 'gradient5' },
  { id: 6, title: 'Modern Web Solutions', subtitle: 'Fast, responsive, beautiful', buttonText: 'Explore', style: 'dark' },
  { id: 7, title: 'Grow Your Business', subtitle: 'Online presence made easy', buttonText: 'Start Today', style: 'light' },
  { id: 8, title: 'Innovation Starts Here', subtitle: 'Create stunning websites instantly', buttonText: 'Join Free', style: 'purple' },
  { id: 9, title: 'Your Success Story', subtitle: 'Build websites that convert', buttonText: 'Get Demo', style: 'blue' },
  { id: 10, title: 'Empower Your Ideas', subtitle: 'No coding required', buttonText: 'Sign Up', style: 'green' },
  { id: 11, title: 'Digital Excellence', subtitle: 'Professional web design tools', buttonText: 'Try Free', style: 'gradient1' },
  { id: 12, title: 'Create & Publish', subtitle: 'Beautiful sites in minutes', buttonText: 'Start Now', style: 'gradient2' },
  { id: 13, title: 'Web Made Simple', subtitle: 'Drag, drop, done', buttonText: 'Get Started', style: 'gradient3' },
  { id: 14, title: 'Build Your Brand', subtitle: 'Stand out online', buttonText: 'Learn More', style: 'gradient4' },
  { id: 15, title: 'Next Level Web', subtitle: 'Modern design tools', buttonText: 'Explore', style: 'gradient5' }
];

// Generare thumbnails pentru meniuri
console.log('Generating menu thumbnails...');
menuConfigs.forEach(config => {
  const svg = generateMenuThumbnail(config);
  const filePath = path.join(__dirname, '..', 'frontend', 'public', 'assets', 'thumbnails', 'menu', `menu-${config.id}.svg`);
  fs.writeFileSync(filePath, svg);
  console.log(`✓ Generated menu-${config.id}.svg`);
});

// Generare thumbnails pentru headere
console.log('\nGenerating header thumbnails...');
headerConfigs.forEach(config => {
  const svg = generateHeaderThumbnail(config);
  const filePath = path.join(__dirname, '..', 'frontend', 'public', 'assets', 'thumbnails', 'header', `header-${config.id}.svg`);
  fs.writeFileSync(filePath, svg);
  console.log(`✓ Generated header-${config.id}.svg`);
});

console.log('\n✅ All thumbnails generated successfully!');
