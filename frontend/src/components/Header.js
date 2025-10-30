import React from 'react';
import { FiMenu, FiSmartphone, FiUploadCloud } from 'react-icons/fi';
import { useBuilder } from '../context/BuilderContext';

const Header = () => {
  const { 
    sidebarOpen, 
    setSidebarOpen, 
    currentSite, 
    currentPage,
    mobilePreview, 
    setMobilePreview 
  } = useBuilder();

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-slate-700 text-white flex items-center justify-between px-4 z-50">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-slate-600 rounded transition-colors"
        >
          <FiMenu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center text-sm font-bold">
            🏠
          </div>
          <span className="font-semibold">{currentPage?.name || 'Home'}</span>
        </div>
        <div className="text-sm">
          <span className={`${currentSite?.status === 'published' ? 'text-green-400' : 'text-red-400'}`}>
            {currentSite?.status === 'published' ? 'Published' : 'Unpublished'}
          </span>
          <span className="text-gray-400 ml-1">{currentSite?.name || 'My Site'}</span>
        </div>
      </div>

      {/* Center Section */}
      <button
        onClick={() => setMobilePreview(!mobilePreview)}
        className={`p-2 rounded transition-colors ${
          mobilePreview ? 'bg-slate-600' : 'hover:bg-slate-600'
        }`}
        title="Mobile Preview"
      >
        <FiSmartphone size={20} />
      </button>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded transition-colors">
          <FiUploadCloud size={18} />
          <span className="font-medium">Publish</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
