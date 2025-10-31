import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useBuilder } from '../context/BuilderContext';

const BlocksPanel = () => {
  const { blocksPanelOpen, setBlocksPanelOpen, addBlock } = useBuilder();

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
  const categories = [...new Set(blockTemplates.map(t => t.category))];

  return (
    <>
      {/* Blocks Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transition-transform duration-300 ${
        blocksPanelOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-slate-700 text-white">
          <h2 className="text-lg font-bold">Add Block</h2>
          <button
            onClick={() => setBlocksPanelOpen(false)}
            className="p-2 hover:bg-slate-600 rounded transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Blocks List by Category */}
        <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
          {categories.map((category) => (
            <div key={category} className="mb-6">
              {/* Category Title */}
              <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                {category}
              </h3>
              
              {/* Blocks in this category */}
              <div className="space-y-3">
                {blockTemplates
                  .filter(t => t.category === category)
                  .map((template, index) => (
                    <button
                      key={index}
                      onClick={() => handleAddBlock(template)}
                      className="w-full bg-white border-2 border-gray-200 hover:border-blue-400 rounded-lg transition-all overflow-hidden group"
                    >
                      {/* Preview Image */}
                      <div className="w-full h-24 overflow-hidden bg-gray-100">
                        <img 
                          src={template.preview} 
                          alt={template.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      {/* Block Name */}
                      <div className="p-2 text-left">
                        <div className="font-medium text-gray-800 text-sm group-hover:text-blue-600">
                          {template.name}
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          ))}

          {/* Pro Tip */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-2">💡 Pro Tip</h3>
            <p className="text-sm text-blue-700">
              Click on any block to add it to your page. Blocks are organized by category for easy navigation.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlocksPanel;
