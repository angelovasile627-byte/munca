import React, { useState } from 'react';
import { X, Search, ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { blockCategories, blockTemplates } from '../data/mockBlocks';

const BlocksPanel = ({ isOpen, onClose, onAddBlock, currentTheme, themes, onThemeChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('header');
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
    <>
      {/* Sidebar Categories - Background Layer */}
      <div className="fixed right-0 top-[57px] bottom-0 w-[600px] bg-[#2d3748] shadow-2xl flex z-40 border-l">
        {/* Categories Sidebar (Background) */}
        <div className="w-48 bg-[#1a202c] border-r border-gray-700 overflow-y-auto">
          <div className="p-2">
            {blockCategories.map((category) => {
              const IconComponent = Icons[category.icon] || Icons.Box;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-red-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="font-medium text-sm">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Blocks Content (Foreground) */}
        <div className="flex-1 flex flex-col bg-[#3a4555]">
          {/* Header */}
          <div className="bg-[#2d3748] px-4 py-3 flex items-center justify-between border-b border-gray-700">
            <h2 className="text-base font-semibold text-white">Drag Block to Page</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search and Theme */}
          <div className="px-4 py-3 border-b border-gray-700 bg-[#2d3748] space-y-2">
            <div className="flex items-center gap-2 bg-[#1a202c] rounded-lg px-3 py-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search blocks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-none bg-transparent h-6 w-full focus-visible:ring-0 text-white placeholder-gray-500"
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

          {/* Blocks Grid - Scrollable */}
          <div className="flex-1 p-4 overflow-y-auto">
            {filteredBlocks.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400 text-sm">No blocks found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredBlocks.map((block) => (
                  <div
                    key={block.id}
                    onClick={() => handleBlockClick(block)}
                    className="bg-[#2d3748] border-2 border-gray-600 rounded-lg overflow-hidden cursor-pointer hover:border-blue-500 hover:shadow-xl transition-all group"
                  >
                    <div className="aspect-video bg-gray-900 overflow-hidden">
                      <img
                        src={block.thumbnail}
                        alt={block.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-3 bg-[#2d3748]">
                      <h3 className="font-medium text-white text-sm">{block.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlocksPanel;