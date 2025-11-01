import React, { useState, useEffect } from 'react';
import { useBuilder } from '../context/BuilderContext';
import { FiX } from 'react-icons/fi';

const BlockSettingsPanel = () => {
  const {
    blockSettingsPanelOpen,
    setBlockSettingsPanelOpen,
    selectedBlockId,
    currentPage,
    updateBlock
  } = useBuilder();

  // Find the selected block
  const selectedBlock = currentPage?.blocks?.find(b => b.id === selectedBlockId);

  // Close panel if no block is selected
  useEffect(() => {
    if (!selectedBlock) {
      setBlockSettingsPanelOpen(false);
    }
  }, [selectedBlock, setBlockSettingsPanelOpen]);

  if (!blockSettingsPanelOpen || !selectedBlock) {
    return null;
  }

  // Handle block settings update
  const handleUpdate = (updates) => {
    updateBlock(selectedBlockId, updates);
  };

  // Render settings based on block type
  const renderSettings = () => {
    switch (selectedBlock.type) {
      case 'menu':
        return <MenuBlockSettings block={selectedBlock} onUpdate={handleUpdate} />;
      case 'header':
        return <HeaderBlockSettings block={selectedBlock} onUpdate={handleUpdate} />;
      case 'text':
        return <TextBlockSettings block={selectedBlock} onUpdate={handleUpdate} />;
      case 'features':
        return <FeaturesBlockSettings block={selectedBlock} onUpdate={handleUpdate} />;
      case 'image':
        return <ImageBlockSettings block={selectedBlock} onUpdate={handleUpdate} />;
      case 'footer':
        return <FooterBlockSettings block={selectedBlock} onUpdate={handleUpdate} />;
      default:
        return <GenericBlockSettings block={selectedBlock} onUpdate={handleUpdate} />;
    }
  };

  return (
    <div className="fixed right-0 top-0 h-screen w-[400px] bg-white shadow-2xl z-50 overflow-y-auto border-l border-gray-200">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
        <h2 className="text-lg font-semibold text-gray-900">Block Settings</h2>
        <button
          onClick={() => setBlockSettingsPanelOpen(false)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Close settings panel"
        >
          <FiX size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Settings Content */}
      <div className="p-6">
        {renderSettings()}
      </div>
    </div>
  );
};

// Menu Block Settings Component
const MenuBlockSettings = ({ block, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [logo, setLogo] = useState(block.content.logo || 'LOGO');
  const [links, setLinks] = useState(block.content.links || []);
  const [style, setStyle] = useState(block.content.style || 'dark');

  const handleSave = () => {
    onUpdate({
      content: {
        ...block.content,
        logo,
        links,
        style
      }
    });
  };

  // Auto-save on change
  useEffect(() => {
    const timer = setTimeout(handleSave, 500);
    return () => clearTimeout(timer);
  }, [logo, links, style]);

  const addLink = () => {
    setLinks([...links, { text: 'New Link', href: '#' }]);
  };

  const updateLink = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  const removeLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'general'
              ? 'border-b-2 border-teal-500 text-teal-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'style'
              ? 'border-b-2 border-teal-500 text-teal-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Style
        </button>
        <button
          onClick={() => setActiveTab('links')}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'links'
              ? 'border-b-2 border-teal-500 text-teal-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Links
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'general' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo Text
            </label>
            <input
              type="text"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
              placeholder="Enter logo text"
            />
          </div>
        </div>
      )}

      {activeTab === 'style' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Menu Style
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="gradient">Gradient</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>
        </div>
      )}

      {activeTab === 'links' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700">
              Navigation Links
            </label>
            <button
              onClick={addLink}
              className="px-3 py-1 bg-teal-500 text-white rounded-md text-sm hover:bg-teal-600 transition-colors"
            >
              Add Link
            </button>
          </div>

          {links.map((link, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg space-y-2">
              <input
                type="text"
                value={link.text}
                onChange={(e) => updateLink(index, 'text', e.target.value)}
                placeholder="Link text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm"
              />
              <input
                type="text"
                value={link.href}
                onChange={(e) => updateLink(index, 'href', e.target.value)}
                placeholder="Link URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm"
              />
              <button
                onClick={() => removeLink(index)}
                className="text-red-600 text-sm hover:text-red-700 font-medium"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Generic settings for other block types (placeholder)
const GenericBlockSettings = ({ block, onUpdate }) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Settings for {block.type} block coming soon...
      </p>
    </div>
  );
};

// Placeholder components for other block types
const HeaderBlockSettings = GenericBlockSettings;
const TextBlockSettings = GenericBlockSettings;
const FeaturesBlockSettings = GenericBlockSettings;
const ImageBlockSettings = GenericBlockSettings;
const FooterBlockSettings = GenericBlockSettings;

export default BlockSettingsPanel;
