import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';
import { useBuilder } from '../context/BuilderContext';

const SiteStylesPanel = () => {
  const { 
    siteStyles, 
    updateSiteStyles, 
    setSiteStylesPanelOpen,
    currentSite 
  } = useBuilder();

  const [localStyles, setLocalStyles] = useState(siteStyles);
  const [showColorPicker, setShowColorPicker] = useState(null); // 'primary' or 'button-0', 'button-1', etc.
  const [showCodeEditor, setShowCodeEditor] = useState(false);

  useEffect(() => {
    setLocalStyles(siteStyles);
  }, [siteStyles]);

  const handleColorChange = (color) => {
    if (showColorPicker === 'primary') {
      const newStyles = {
        ...localStyles,
        colors: { ...localStyles.colors, primary: color }
      };
      setLocalStyles(newStyles);
      updateSiteStyles(newStyles);
    } else if (showColorPicker?.startsWith('button-')) {
      const index = parseInt(showColorPicker.split('-')[1]);
      const newButtonColors = [...localStyles.colors.buttonsAndLinks];
      newButtonColors[index] = color;
      const newStyles = {
        ...localStyles,
        colors: { ...localStyles.colors, buttonsAndLinks: newButtonColors }
      };
      setLocalStyles(newStyles);
      updateSiteStyles(newStyles);
    }
  };

  const handleFontChange = (fontType, property, value) => {
    const newStyles = {
      ...localStyles,
      fonts: {
        ...localStyles.fonts,
        [fontType]: {
          ...localStyles.fonts[fontType],
          [property]: property === 'size' ? parseFloat(value) : value
        }
      }
    };
    setLocalStyles(newStyles);
    updateSiteStyles(newStyles);
  };

  const handleOptionToggle = (option) => {
    const newStyles = {
      ...localStyles,
      options: {
        ...localStyles.options,
        [option]: !localStyles.options[option]
      }
    };
    setLocalStyles(newStyles);
    updateSiteStyles(newStyles);
  };

  const handleCustomCSSChange = (css) => {
    const newStyles = {
      ...localStyles,
      customCSS: css
    };
    setLocalStyles(newStyles);
    updateSiteStyles(newStyles);
  };

  const fontFamilies = [
    'Inter Tight',
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Georgia',
    'Courier New',
    'Verdana',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Poppins'
  ];

  return (
    <div className="w-96 h-full bg-gray-800 border-l border-gray-700 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Site Styles</h2>
        <button
          onClick={() => setSiteStylesPanelOpen(false)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Colors Section */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Colors</h3>
          
          {/* Primary Color */}
          <div className="mb-4">
            <label className="text-xs text-gray-400 mb-2 block">Primary</label>
            <div className="relative">
              <button
                onClick={() => setShowColorPicker(showColorPicker === 'primary' ? null : 'primary')}
                className="w-16 h-10 rounded border-2 border-gray-600 hover:border-gray-500 transition-colors"
                style={{ backgroundColor: localStyles.colors.primary }}
              />
              {showColorPicker === 'primary' && (
                <div className="absolute z-50 mt-2">
                  <div className="fixed inset-0" onClick={() => setShowColorPicker(null)} />
                  <div className="relative">
                    <HexColorPicker 
                      color={localStyles.colors.primary} 
                      onChange={handleColorChange} 
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Buttons and Links Colors */}
          <div>
            <label className="text-xs text-gray-400 mb-2 block">Buttons and Links</label>
            <div className="flex gap-2 flex-wrap">
              {localStyles.colors.buttonsAndLinks.map((color, index) => (
                <div key={index} className="relative">
                  <button
                    onClick={() => setShowColorPicker(showColorPicker === `button-${index}` ? null : `button-${index}`)}
                    className="w-12 h-10 rounded border-2 border-gray-600 hover:border-gray-500 transition-colors"
                    style={{ backgroundColor: color }}
                  />
                  {showColorPicker === `button-${index}` && (
                    <div className="absolute z-50 mt-2">
                      <div className="fixed inset-0" onClick={() => setShowColorPicker(null)} />
                      <div className="relative">
                        <HexColorPicker 
                          color={color} 
                          onChange={handleColorChange} 
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fonts Section */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Fonts</h3>
          
          {['title1', 'title2', 'title3', 'text', 'menu'].map((fontType) => (
            <div key={fontType} className="mb-3">
              <label className="text-xs text-gray-400 mb-2 block capitalize">
                {fontType === 'title1' ? 'Title 1' : 
                 fontType === 'title2' ? 'Title 2' : 
                 fontType === 'title3' ? 'Title 3' : 
                 fontType}
              </label>
              <div className="flex gap-2">
                <select
                  value={localStyles.fonts[fontType].family}
                  onChange={(e) => handleFontChange(fontType, 'family', e.target.value)}
                  className="flex-1 bg-gray-700 text-white text-sm px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                >
                  {fontFamilies.map((font) => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="10"
                  value={localStyles.fonts[fontType].size}
                  onChange={(e) => handleFontChange(fontType, 'size', e.target.value)}
                  className="w-16 bg-gray-700 text-white text-sm px-2 py-2 rounded border border-gray-600 focus:outline-none focus:border-blue-500 text-center"
                />
              </div>
            </div>
          ))}

          <button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition-colors">
            ADD FONT
          </button>
        </div>

        {/* Options Section */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Options</h3>
          
          {[
            { key: 'roundedCorners', label: 'Rounded Corners' },
            { key: 'roundedButtons', label: 'Rounded Buttons' },
            { key: 'largeButtons', label: 'Large Buttons' },
            { key: 'underlinedLinks', label: 'Underlined Links' },
            { key: 'animationOnScroll', label: 'Animation on Scroll' }
          ].map((option) => (
            <div key={option.key} className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-300">{option.label}</span>
              <button
                onClick={() => handleOptionToggle(option.key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  localStyles.options[option.key] ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    localStyles.options[option.key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Edit in Code Editor Button */}
        <button
          onClick={() => setShowCodeEditor(true)}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-3 px-4 rounded transition-colors"
        >
          EDIT IN CODE EDITOR
        </button>

      </div>

      {/* Code Editor Modal */}
      {showCodeEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg w-3/4 h-3/4 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Custom CSS</h3>
              <button
                onClick={() => setShowCodeEditor(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 p-4">
              <textarea
                value={localStyles.customCSS}
                onChange={(e) => handleCustomCSSChange(e.target.value)}
                className="w-full h-full bg-gray-900 text-green-400 font-mono text-sm p-4 rounded border border-gray-700 focus:outline-none focus:border-blue-500 resize-none"
                placeholder="/* Add your custom CSS here */"
              />
            </div>
            <div className="p-4 border-t border-gray-700 flex justify-end gap-2">
              <button
                onClick={() => setShowCodeEditor(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => setShowCodeEditor(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteStylesPanel;
