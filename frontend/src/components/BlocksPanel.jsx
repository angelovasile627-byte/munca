import React, { useState } from 'react';
import { X, Search, ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { blockCategories, blockTemplates } from '../data/mockBlocks';

const BlocksPanel = ({ isOpen, onClose, onAddBlock, currentTheme, themes, onThemeChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('menu');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const currentBlocks = blockTemplates[selectedCategory] || [];
  const filteredBlocks = currentBlocks.filter((block) =>
    block.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBlockClick = (block) => {
    onAddBlock(block);
  };

  return (
    <div className="fixed right-0 top-[57px] bottom-0 w-[400px] bg-white shadow-2xl flex flex-col z-40 border-l">
      {/* Header */}
      <div className="bg-gray-100 px-4 py-3 flex items-center justify-between border-b">
        <h2 className="text-base font-semibold text-gray-800">Drag Block to Page</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search and Theme */}
      <div className="px-4 py-3 border-b bg-white space-y-2">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
          <Search className="h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search blocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-none bg-transparent h-6 w-full focus-visible:ring-0"
          />
        </div>
        <div className="relative">
          <select
            value={currentTheme}
            onChange={(e) => onThemeChange(e.target.value)}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg appearance-none cursor-pointer pr-8 font-medium text-sm"
          >
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Categories Sidebar */}
        <div className="w-32 bg-gray-50 border-r overflow-y-auto">
          <div className="p-1">
            {blockCategories.map((category) => {
              const IconComponent = Icons[category.icon] || Icons.Box;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex flex-col items-center gap-1 px-2 py-3 rounded-lg text-left transition-colors text-xs ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="font-medium text-center leading-tight">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Blocks Grid */}
        <div className="flex-1 p-3 overflow-y-auto">
          {filteredBlocks.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400 text-sm">No blocks found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredBlocks.map((block) => (
                <div
                  key={block.id}
                  onClick={() => handleBlockClick(block)}
                  className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:border-blue-500 hover:shadow-md transition-all group"
                >
                  <div className="aspect-video bg-gray-100 overflow-hidden">
                    <img
                      src={block.thumbnail}
                      alt={block.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-2 bg-white">
                    <h3 className="font-medium text-gray-800 text-sm">{block.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlocksPanel;