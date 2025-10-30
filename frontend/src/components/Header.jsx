import React, { useState } from 'react';
import { Menu, Smartphone, Search, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Header = ({ onMenuClick, onThemeChange, currentTheme, themes, onPublish }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-[#2B2E33] border-b border-gray-700 px-4 py-3 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-gray-700"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold text-lg">Home</span>
          <span className="text-gray-400 text-sm">Unpublished My Site</span>
        </div>
      </div>

      {/* Center Section */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700">
          <Smartphone className="h-5 w-5" />
        </Button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-gray-700 rounded-lg px-3 py-1.5">
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none text-white placeholder-gray-400 h-8 w-32 focus-visible:ring-0"
          />
          <Button
            size="sm"
            className="bg-purple-600 hover:bg-purple-700 text-white h-8 px-3"
          >
            SEARCH
          </Button>
        </div>

        <div className="relative">
          <select
            value={currentTheme}
            onChange={(e) => onThemeChange(e.target.value)}
            className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg appearance-none cursor-pointer pr-8 font-medium"
          >
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
        </div>

        <Button
          onClick={onPublish}
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-6"
        >
          Publish
        </Button>

        <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium px-6">
          Upgrade
        </Button>
      </div>
    </header>
  );
};

export default Header;