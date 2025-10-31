import React from 'react';
import { FiX } from 'react-icons/fi';
import { useBuilder } from '../context/BuilderContext';

const BlocksPanel = () => {
  const { blocksPanelOpen, setBlocksPanelOpen, addBlock } = useBuilder();

  const blockTemplates = [
    {
      type: 'header',
      name: 'Hero Header',
      icon: '🌠',
      content: {
        title: 'Welcome to Your Website',
        subtitle: 'Build amazing websites with ease',
        buttonText: 'Get Started'
      }
    },
    {
      type: 'text',
      name: 'Text Block',
      icon: '📝',
      content: {
        heading: 'About Us',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
    },
    {
      type: 'features',
      name: 'Features Grid',
      icon: '🎯',
      content: {}
    },
    {
      type: 'image',
      name: 'Image Block',
      icon: '🖼️',
      content: {
        src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
        alt: 'Beautiful image'
      }
    },
    {
      type: 'footer',
      name: 'Footer',
      icon: '👇',
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

  return (
    <>
      {/* Overlay - Removed to allow clicking on canvas */}
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

        {/* Blocks List */}
        <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
          <div className="space-y-3">
            {blockTemplates.map((template, index) => (
              <button
                key={index}
                onClick={() => handleAddBlock(template)}
                className="w-full p-4 bg-gray-50 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-400 rounded-lg transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{template.icon}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 group-hover:text-blue-600">
                      {template.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      Click to add
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Category Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-2">💡 Pro Tip</h3>
            <p className="text-sm text-blue-700">
              Drag blocks to reorder them on the canvas. Click the edit button to customize each block.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlocksPanel;
