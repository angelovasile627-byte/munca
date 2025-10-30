import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';

const BlockEditorPanel = ({ isOpen, block, onClose, onUpdate }) => {
  const [showLogo, setShowLogo] = useState(true);
  const [logoSize, setLogoSize] = useState(50);
  const [showBrandName, setShowBrandName] = useState(true);
  const [showMenuItems, setShowMenuItems] = useState(true);
  const [menuAlign, setMenuAlign] = useState('left');
  const [showIcons, setShowIcons] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [isTransparent, setIsTransparent] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [opacity, setOpacity] = useState(100);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [hamburgerColor, setHamburgerColor] = useState('#000000');

  if (!isOpen || !block) return null;

  return (
    <div className="fixed right-0 top-[57px] bottom-0 w-[350px] bg-[#2d3748] shadow-2xl flex flex-col z-40 border-l border-gray-700">
      {/* Header */}
      <div className="bg-[#1a202c] px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <h2 className="text-sm font-semibold text-white">Block Parameters</h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Show/Hide Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Show/Hide</h3>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="logo" className="text-sm text-gray-300">Logo</Label>
            <Switch
              id="logo"
              checked={showLogo}
              onCheckedChange={setShowLogo}
            />
          </div>

          {showLogo && (
            <div className="space-y-2 pl-4">
              <Label className="text-xs text-gray-400">Logo Size</Label>
              <Slider
                value={[logoSize]}
                onValueChange={(value) => setLogoSize(value[0])}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="text-xs text-gray-500 text-right">{logoSize}%</div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <Label htmlFor="brand" className="text-sm text-gray-300">Brand Name</Label>
            <Switch
              id="brand"
              checked={showBrandName}
              onCheckedChange={setShowBrandName}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="menu" className="text-sm text-gray-300">Menu Items</Label>
            <Switch
              id="menu"
              checked={showMenuItems}
              onCheckedChange={setShowMenuItems}
            />
          </div>

          {showMenuItems && (
            <div className="space-y-2 pl-4">
              <Label className="text-xs text-gray-400">Menu Items Align</Label>
              <select
                value={menuAlign}
                onChange={(e) => setMenuAlign(e.target.value)}
                className="w-full bg-[#1a202c] text-white border border-gray-600 rounded px-3 py-2 text-sm"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          )}

          <div className="flex items-center justify-between">
            <Label htmlFor="icons" className="text-sm text-gray-300">Icons</Label>
            <Switch
              id="icons"
              checked={showIcons}
              onCheckedChange={setShowIcons}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="button" className="text-sm text-gray-300">Button</Label>
            <Switch
              id="button"
              checked={showButton}
              onCheckedChange={setShowButton}
            />
          </div>
        </div>

        {/* Styles Section */}
        <div className="space-y-3 pt-4 border-t border-gray-700">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Styles</h3>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="transparent" className="text-sm text-gray-300">Transparent</Label>
            <Switch
              id="transparent"
              checked={isTransparent}
              onCheckedChange={setIsTransparent}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="sticky" className="text-sm text-gray-300">Sticky</Label>
            <Switch
              id="sticky"
              checked={isSticky}
              onCheckedChange={setIsSticky}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-gray-400">Opacity</Label>
            <Slider
              value={[opacity]}
              onValueChange={(value) => setOpacity(value[0])}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="text-xs text-gray-500 text-right">{opacity}%</div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-gray-400">Color</Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-12 h-10 rounded border border-gray-600 cursor-pointer"
              />
              <Input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="flex-1 bg-[#1a202c] text-white border-gray-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-gray-400">Hamburger</Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={hamburgerColor}
                onChange={(e) => setHamburgerColor(e.target.value)}
                className="w-12 h-10 rounded border border-gray-600 cursor-pointer"
              />
              <Input
                type="text"
                value={hamburgerColor}
                onChange={(e) => setHamburgerColor(e.target.value)}
                className="flex-1 bg-[#1a202c] text-white border-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="pt-4 border-t border-gray-700">
          <p className="text-xs text-gray-500">Block ID: {block.id}</p>
          <p className="text-xs text-gray-500 mt-1">Type: {block.name}</p>
        </div>
      </div>
    </div>
  );
};

export default BlockEditorPanel;