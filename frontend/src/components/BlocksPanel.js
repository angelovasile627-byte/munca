import React, { useState, useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';
import { useBuilder } from '../context/BuilderContext';

const BlocksPanel = () => {
  const { blocksPanelOpen, setBlocksPanelOpen, addBlock } = useBuilder();
  const [selectedCategory, setSelectedCategory] = useState('Menu');
  const [visibleCount, setVisibleCount] = useState(6); // Lazy loading: start with 6 blocks
  const scrollContainerRef = useRef(null);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(6);
  }, [selectedCategory]);

  // Lazy loading: detect scroll to bottom
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // Load more when scrolled to 70% of content (more aggressive)
      if (scrollTop + clientHeight >= scrollHeight * 0.7) {
        setVisibleCount(prev => {
          const allBlocks = getBlocksForCategory(selectedCategory);
          // Only increase if we have more blocks to show
          if (prev < allBlocks.length) {
            return prev + 6;
          }
          return prev;
        });
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [selectedCategory, visibleCount]);

  // Definește toate categoriile disponibile
  const categories = [
    'Menu',
    'Header', 
    'Features',
    'Article',
    'Image & Video',
    'Gallery & Slider',
    'People',
    'Contact',
    'Social',
    'Footer',
    'Form',
    'List',
    'Numbers',
    'Pricing',
    'News',
    'Chat',
    'HTML',
    'Extensions'
  ];

  const blockTemplates = [
    // Menu Blocks - 20 variante cu thumbnail-uri reale
    {
      type: 'menu',
      name: 'Menu 1',
      category: 'Menu',
      preview: '/assets/thumbnails/menu/menu-1.svg',
      content: {
        logo: 'Mobirise',
        links: [
          { text: 'About', href: '#about' },
          { text: 'Services', href: '#services' },
          { text: 'Contacts', href: '#contacts' }
        ],
        buttonText: 'Start Now!',
        style: 'light'
      }
    },
    {
      type: 'menu',
      name: 'Menu 2',
      category: 'Menu',
      preview: '/assets/thumbnails/menu/menu-2.svg',
      content: {
        logo: 'LOGO',
        links: [
          { text: 'Home', href: '#home' },
          { text: 'About', href: '#about' },
          { text: 'Services', href: '#services' },
          { text: 'Contact', href: '#contact' }
        ],
        buttonText: 'Get Started',
        style: 'dark'
      }
    },
    {
      type: 'menu',
      name: 'Menu 3',
      category: 'Menu',
      preview: '/assets/thumbnails/menu/menu-3.svg',
      content: {
        logo: 'BRAND',
        links: [
          { text: 'Features', href: '#features' },
          { text: 'Pricing', href: '#pricing' },
          { text: 'About', href: '#about' }
        ],
        buttonText: 'Sign Up',
        style: 'gradient'
      }
    },
    {
      type: 'menu',
      name: 'Menu 4',
      category: 'Menu',
      preview: '/assets/thumbnails/menu/menu-4.svg',
      content: {
        logo: 'COMPANY',
        links: [
          { text: 'Products', href: '#products' },
          { text: 'Solutions', href: '#solutions' },
          { text: 'Support', href: '#support' }
        ],
        buttonText: 'Contact',
        style: 'minimal'
      }
    },
    {
      type: 'menu',
      name: 'Menu 5',
      category: 'Menu',
      preview: '/assets/thumbnails/menu/menu-5.svg',
      content: {
        logo: 'STUDIO',
        links: [
          { text: 'Portfolio', href: '#portfolio' },
          { text: 'Services', href: '#services' },
          { text: 'Blog', href: '#blog' }
        ],
        buttonText: 'Hire Us',
        style: 'colored'
      }
    },
    {
      type: 'menu',
      name: 'Menu 6',
      category: 'Menu',
      preview: '/assets/thumbnails/menu/menu-6.svg',
      content: {
        logo: 'AGENCY',
        links: [
          { text: 'Work', href: '#work' },
          { text: 'About', href: '#about' },
          { text: 'Contact', href: '#contact' }
        ],
        buttonText: 'Start Project',
        style: 'modern'
      }
    },
    {
      type: 'menu',
      name: 'Menu 7',
      category: 'Menu',
      preview: '/assets/thumbnails/menu/menu-7.svg',
      content: {
        logo: 'CREATIVE',
        links: [
          { text: 'Services', href: '#services' },
          { text: 'Portfolio', href: '#portfolio' },
          { text: 'Team', href: '#team' }
        ],
        buttonText: 'Get Quote',
        style: 'light'
      }
    },
    {
      type: 'menu',
      name: 'Menu 8',
      category: 'Menu',
      preview: '/assets/thumbnails/menu/menu-8.svg',
      content: {
        logo: 'DIGITAL',
        links: [
          { text: 'Solutions', href: '#solutions' },
          { text: 'Cases', href: '#cases' },
          { text: 'Insights', href: '#insights' }
        ],
        buttonText: 'Learn More',
        style: 'dark'
      }
    },
    {
      type: 'menu',
      name: 'Menu 9',
      category: 'Menu',
      preview: '/assets/thumbnails/menu/menu-9.svg',
      content: {
        logo: 'TECH',
        links: [
          { text: 'Products', href: '#products' },
          { text: 'Features', href: '#features' },
          { text: 'Pricing', href: '#pricing' }
        ],
        buttonText: 'Try Free',
        style: 'gradient'
      }
    },
    {
      type: 'menu',
      name: 'Menu 10',
      category: 'Menu',
      preview: '/assets/thumbnails/menu/menu-10.svg',
      content: {
        logo: 'START',
        links: [
          { text: 'Home', href: '#home' },
          { text: 'Features', href: '#features' },
          { text: 'Pricing', href: '#pricing' }
        ],
        buttonText: 'Sign Up',
        style: 'minimal'
      }
    },
    {
      type: 'menu',
      name: 'Menu 11',
      category: 'Menu',
      preview: '/assets/thumbnails/menu/menu-11.svg',
      content: {
        logo: 'BIZZ',
        links: [
          { text: 'Services', href: '#services' },
          { text: 'About', href: '#about' },
          { text: 'Contact', href: '#contact' }
        ],
        buttonText: 'Get Started',
        style: 'colored'
      }
    },
    {
      type: 'menu',
      name: 'Menu 12',
      category: 'Menu',
      preview: '/assets/thumbnails/menu/menu-12.svg',
      content: {
        logo: 'PRO',
        links: [
          { text: 'Features', href: '#features' },
          { text: 'Docs', href: '#docs' },
          { text: 'Support', href: '#support' }
        ],
        buttonText: 'Download',
        style: 'modern'
      }
    },
    {
      type: 'menu',
      name: 'Menu 13',
      category: 'Menu',
      preview: '/assets/thumbnails/menu/menu-13.svg',
      content: {
        logo: 'WAVE',
        links: [
          { text: 'Solutions', href: '#solutions' },
          { text: 'Pricing', href: '#pricing' },
          { text: 'Blog', href: '#blog' }
        ],
        buttonText: 'Contact Us',
        style: 'light'
      }
    },
    {
      type: 'menu',
      name: 'Menu 14',
      category: 'Menu',
      preview: '/assets/thumbnails/menu/menu-14.svg',
      content: {
        logo: 'NEXT',
        links: [
          { text: 'Home', href: '#home' },
          { text: 'About', href: '#about' },
          { text: 'Services', href: '#services' }
        ],
        buttonText: 'Join Now',
        style: 'dark'
      }
    },
    {
      type: 'menu',
      name: 'Menu 15',
      category: 'Menu',
      preview: '/assets/thumbnails/menu/menu-15.svg',
      content: {
        logo: 'FLEX',
        links: [
          { text: 'Products', href: '#products' },
          { text: 'Pricing', href: '#pricing' },
          { text: 'FAQ', href: '#faq' }
        ],
        buttonText: 'Buy Now',
        style: 'gradient'
      }
    },
    {
      type: 'menu',
      name: 'Menu 16',
      category: 'Menu',
      preview: '/assets/thumbnails/menu/menu-16.svg',
      content: {
        logo: 'CORE',
        links: [
          { text: 'Features', href: '#features' },
          { text: 'Team', href: '#team' },
          { text: 'Contact', href: '#contact' }
        ],
        buttonText: 'Get Demo',
        style: 'minimal'
      }
    },
    {
      type: 'menu',
      name: 'Menu 17',
      category: 'Menu',
      preview: '/assets/thumbnails/menu/menu-17.svg',
      content: {
        logo: 'SPARK',
        links: [
          { text: 'About', href: '#about' },
          { text: 'Work', href: '#work' },
          { text: 'Blog', href: '#blog' }
        ],
        buttonText: 'Hire Us',
        style: 'colored'
      }
    },
    {
      type: 'menu',
      name: 'Menu 18',
      category: 'Menu',
      preview: '/assets/thumbnails/menu/menu-18.svg',
      content: {
        logo: 'PIXEL',
        links: [
          { text: 'Portfolio', href: '#portfolio' },
          { text: 'Services', href: '#services' },
          { text: 'Contact', href: '#contact' }
        ],
        buttonText: 'Start Now',
        style: 'modern'
      }
    },
    {
      type: 'menu',
      name: 'Menu 19',
      category: 'Menu',
      preview: '/assets/thumbnails/menu/menu-19.svg',
      content: {
        logo: 'ZOOM',
        links: [
          { text: 'Features', href: '#features' },
          { text: 'Pricing', href: '#pricing' },
          { text: 'Resources', href: '#resources' }
        ],
        buttonText: 'Sign Up',
        style: 'light'
      }
    },
    {
      type: 'menu',
      name: 'Menu 20',
      category: 'Menu',
      preview: '/assets/thumbnails/menu/menu-20.svg',
      content: {
        logo: 'APEX',
        links: [
          { text: 'Solutions', href: '#solutions' },
          { text: 'Cases', href: '#cases' },
          { text: 'About', href: '#about' }
        ],
        buttonText: 'Contact',
        style: 'dark'
      }
    },
    // Header Blocks - 15 variante cu thumbnail-uri reale
    {
      type: 'header',
      name: 'Header 1',
      category: 'Header',
      preview: '/assets/thumbnails/header/header-1.svg',
      content: {
        title: 'Create, connect, shine',
        subtitle: 'Make your own website in a few clicks',
        buttonText: 'Start Free',
        style: 'gradient1'
      }
    },
    {
      type: 'header',
      name: 'Header 2',
      category: 'Header',
      preview: '/assets/thumbnails/header/header-2.svg',
      content: {
        title: 'Experience the future',
        subtitle: 'Do what you love doing with ease',
        buttonText: 'Contact Us',
        style: 'gradient2'
      }
    },
    {
      type: 'header',
      name: 'Header 3',
      category: 'Header',
      preview: '/assets/thumbnails/header/header-3.svg',
      content: {
        title: 'Build Amazing Sites',
        subtitle: 'Professional websites made simple',
        buttonText: 'Get Started',
        style: 'gradient3'
      }
    },
    {
      type: 'header',
      name: 'Header 4',
      category: 'Header',
      preview: '/assets/thumbnails/header/header-4.svg',
      content: {
        title: 'Your Vision, Our Code',
        subtitle: 'Transform ideas into reality',
        buttonText: 'Learn More',
        style: 'gradient4'
      }
    },
    {
      type: 'header',
      name: 'Header 5',
      category: 'Header',
      preview: '/assets/thumbnails/header/header-5.svg',
      content: {
        title: 'Design Without Limits',
        subtitle: 'Creativity meets simplicity',
        buttonText: 'Try Now',
        style: 'gradient5'
      }
    },
    {
      type: 'header',
      name: 'Header 6',
      category: 'Header',
      preview: '/assets/thumbnails/header/header-6.svg',
      content: {
        title: 'Modern Web Solutions',
        subtitle: 'Fast, responsive, beautiful',
        buttonText: 'Explore',
        style: 'dark'
      }
    },
    {
      type: 'header',
      name: 'Header 7',
      category: 'Header',
      preview: '/assets/thumbnails/header/header-7.svg',
      content: {
        title: 'Grow Your Business',
        subtitle: 'Online presence made easy',
        buttonText: 'Start Today',
        style: 'light'
      }
    },
    {
      type: 'header',
      name: 'Header 8',
      category: 'Header',
      preview: '/assets/thumbnails/header/header-8.svg',
      content: {
        title: 'Innovation Starts Here',
        subtitle: 'Create stunning websites instantly',
        buttonText: 'Join Free',
        style: 'purple'
      }
    },
    {
      type: 'header',
      name: 'Header 9',
      category: 'Header',
      preview: '/assets/thumbnails/header/header-9.svg',
      content: {
        title: 'Your Success Story',
        subtitle: 'Build websites that convert',
        buttonText: 'Get Demo',
        style: 'blue'
      }
    },
    {
      type: 'header',
      name: 'Header 10',
      category: 'Header',
      preview: '/assets/thumbnails/header/header-10.svg',
      content: {
        title: 'Empower Your Ideas',
        subtitle: 'No coding required',
        buttonText: 'Sign Up',
        style: 'green'
      }
    },
    {
      type: 'header',
      name: 'Header 11',
      category: 'Header',
      preview: '/assets/thumbnails/header/header-11.svg',
      content: {
        title: 'Digital Excellence',
        subtitle: 'Professional web design tools',
        buttonText: 'Try Free',
        style: 'gradient1'
      }
    },
    {
      type: 'header',
      name: 'Header 12',
      category: 'Header',
      preview: '/assets/thumbnails/header/header-12.svg',
      content: {
        title: 'Create & Publish',
        subtitle: 'Beautiful sites in minutes',
        buttonText: 'Start Now',
        style: 'gradient2'
      }
    },
    {
      type: 'header',
      name: 'Header 13',
      category: 'Header',
      preview: '/assets/thumbnails/header/header-13.svg',
      content: {
        title: 'Web Made Simple',
        subtitle: 'Drag, drop, done',
        buttonText: 'Get Started',
        style: 'gradient3'
      }
    },
    {
      type: 'header',
      name: 'Header 14',
      category: 'Header',
      preview: '/assets/thumbnails/header/header-14.svg',
      content: {
        title: 'Build Your Brand',
        subtitle: 'Stand out online',
        buttonText: 'Learn More',
        style: 'gradient4'
      }
    },
    {
      type: 'header',
      name: 'Header 15',
      category: 'Header',
      preview: '/assets/thumbnails/header/header-15.svg',
      content: {
        title: 'Next Level Web',
        subtitle: 'Modern design tools',
        buttonText: 'Explore',
        style: 'gradient5'
      }
    },
    // Text Blocks
    {
      type: 'text',
      name: 'Text Block',
      category: 'Article',
      preview: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=200&fit=crop',
      content: {
        heading: 'About Us',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
    },
    // Features
    {
      type: 'features',
      name: 'Features Grid',
      category: 'Features',
      preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
      content: {}
    },
    // Image
    {
      type: 'image',
      name: 'Image Block',
      category: 'Image & Video',
      preview: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop',
      content: {
        src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
        alt: 'Beautiful image'
      }
    },
    // Footer
    {
      type: 'footer',
      name: 'Footer',
      category: 'Footer',
      preview: 'https://images.unsplash.com/photo-1557682268-e3955ed5d83f?w=400&h=150&fit=crop',
      content: {}
    }
  ];

  const handleAddBlock = (template) => {
    addBlock({
      type: template.type,
      content: template.content
    });
    // Închide panelul după adăugare pentru a evita probleme cu viewport
    setBlocksPanelOpen(false);
  };

  // Group blocks by category
  const getBlocksForCategory = (category) => {
    return blockTemplates.filter(t => t.category === category);
  };

  // Get visible blocks based on lazy loading
  const getVisibleBlocks = () => {
    const categoryBlocks = getBlocksForCategory(selectedCategory);
    return categoryBlocks.slice(0, visibleCount);
  };

  const allBlocks = getBlocksForCategory(selectedCategory);
  const visibleBlocks = getVisibleBlocks();
  const hasMore = visibleBlocks.length < allBlocks.length;

  return (
    <>
      {/* Blocks Panel */}
      <div className={`fixed top-0 right-0 h-full w-[600px] bg-slate-800 shadow-2xl z-50 transition-transform duration-300 flex ${
        blocksPanelOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Main Content Area - Blocks Display */}
        <div className="flex-1 flex flex-col bg-slate-700">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-600 bg-slate-800 text-white">
            <h2 className="text-lg font-bold">Drag Block to Page</h2>
            <button
              onClick={() => setBlocksPanelOpen(false)}
              className="p-2 hover:bg-slate-700 rounded transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Category Title */}
          <div className="p-4 border-b border-slate-600">
            <h3 className="text-white font-semibold text-lg">{selectedCategory}</h3>
          </div>

          {/* Blocks Grid with Lazy Loading */}
          <div ref={scrollContainerRef} className="flex-1 p-4 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              {visibleBlocks.map((template, index) => (
                <div
                  key={index}
                  onClick={() => handleAddBlock(template)}
                  className="bg-slate-600 border-2 border-slate-500 hover:border-blue-400 rounded-lg transition-all overflow-hidden group cursor-pointer"
                >
                  {/* Preview Image/SVG */}
                  <div className="w-full h-auto overflow-hidden bg-slate-800 flex items-center justify-center p-2">
                    <img 
                      src={template.preview} 
                      alt={template.name}
                      className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Block Name */}
                  <div className="p-2 text-left bg-slate-600">
                    <div className="font-medium text-white text-sm">
                      {template.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Loading More Indicator */}
            {hasMore && (
              <div className="mt-6 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="animate-pulse flex space-x-2 justify-center items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  </div>
                  <div className="text-gray-400 text-xs mt-2">
                    Scroll pentru mai multe blocuri...
                  </div>
                </div>
              </div>
            )}

            {/* All Blocks Loaded */}
            {!hasMore && allBlocks.length > 0 && (
              <div className="mt-6 flex items-center justify-center">
                <div className="text-center p-3 bg-slate-600/50 rounded-lg">
                  <div className="text-gray-400 text-xs">
                    Toate blocurile {selectedCategory} au fost încărcate
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {allBlocks.length === 0 && (
              <div className="flex items-center justify-center h-64">
                <div className="text-center text-gray-400">
                  <p className="text-lg mb-2">No blocks available</p>
                  <p className="text-sm">More {selectedCategory} blocks coming soon</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Categories Menu */}
        <div className="w-40 bg-slate-900 border-l border-slate-700 overflow-y-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full px-4 py-3 text-left text-sm transition-colors border-b border-slate-800 ${
                selectedCategory === category
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlocksPanel;
