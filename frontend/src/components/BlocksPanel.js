import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useBuilder } from '../context/BuilderContext';

const BlocksPanel = () => {
  const { blocksPanelOpen, setBlocksPanelOpen, addBlock } = useBuilder();
  const [selectedCategory, setSelectedCategory] = useState('Menu');

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
    // Menu Blocks
    {
      type: 'menu',
      name: 'Menu 1',
      category: 'Menu',
      preview: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=80&fit=crop',
      content: {
        logo: 'MOBIRISE',
        links: [
          { text: 'About', href: '#about' },
          { text: 'Services', href: '#services' },
          { text: 'Contacts', href: '#contacts' }
        ],
        buttonText: 'Start Now!',
        style: 'dark'
      }
    },
    {
      type: 'menu',
      name: 'Menu 2',
      category: 'Menu',
      preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=80&fit=crop',
      content: {
        logo: 'LOGO',
        links: [
          { text: 'Home', href: '#home' },
          { text: 'About', href: '#about' },
          { text: 'Services', href: '#services' },
          { text: 'Contact', href: '#contact' }
        ],
        buttonText: 'Get Started',
        style: 'light'
      }
    },
    {
      type: 'menu',
      name: 'Menu 3',
      category: 'Menu',
      preview: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=80&fit=crop',
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
      preview: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=80&fit=crop',
      content: {
        logo: 'COMPANY',
        links: [
          { text: 'Products', href: '#products' },
          { text: 'Solutions', href: '#solutions' },
          { text: 'Support', href: '#support' }
        ],
        buttonText: 'Contact Us',
        style: 'minimal'
      }
    },
    // Header Blocks
    {
      type: 'header',
      name: 'Hero Header',
      category: 'Header',
      preview: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=400&h=200&fit=crop',
      content: {
        title: 'Welcome to Your Website',
        subtitle: 'Build amazing websites with ease',
        buttonText: 'Get Started'
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
    // Nu închide panelul automat - rămâne deschis până când utilizatorul dă click în canvas
    // setBlocksPanelOpen(false);
  };

  // Group blocks by category
  const getBlocksForCategory = (category) => {
    return blockTemplates.filter(t => t.category === category);
  };

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

          {/* Blocks Grid */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              {getBlocksForCategory(selectedCategory).map((template, index) => (
                <button
                  key={index}
                  onClick={() => handleAddBlock(template)}
                  className="bg-slate-600 border-2 border-slate-500 hover:border-blue-400 rounded-lg transition-all overflow-hidden group"
                >
                  {/* Preview Image */}
                  <div className="w-full h-32 overflow-hidden bg-slate-800">
                    <img 
                      src={template.preview} 
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Block Name */}
                  <div className="p-2 text-left bg-slate-600">
                    <div className="font-medium text-white text-sm">
                      {template.name}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* More Blocks Placeholder */}
            {getBlocksForCategory(selectedCategory).length > 0 && (
              <div className="mt-6 flex items-center justify-center">
                <div className="text-center p-4 bg-slate-600 rounded-lg">
                  <div className="text-white text-sm">More {selectedCategory} Blocks</div>
                  <div className="text-gray-400 text-xs mt-1">Coming soon...</div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {getBlocksForCategory(selectedCategory).length === 0 && (
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
