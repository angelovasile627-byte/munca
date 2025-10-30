import React from 'react';
import { FiX, FiChevronRight } from 'react-icons/fi';
import { useBuilder } from '../context/BuilderContext';

const Sidebar = () => {
  const { 
    sidebarOpen, 
    setSidebarOpen, 
    currentPage, 
    currentSite,
    setPagesPanelOpen,
    setSitesPanelOpen
  } = useBuilder();

  const handleMenuClick = (item) => {
    if (item.title === 'Pages') {
      setPagesPanelOpen(true);
      setSidebarOpen(false);
    } else if (item.title === 'Sites') {
      setSitesPanelOpen(true);
      setSidebarOpen(false);
    }
  };

  const menuItems = [
    {
      title: 'Pages',
      subtitle: currentPage?.name || 'Home',
      icon: '📄',
      onClick: () => handleMenuClick({ title: 'Pages' })
    },
    {
      title: 'Sites',
      subtitle: currentSite?.name || 'My Site',
      icon: '🌐',
      onClick: () => handleMenuClick({ title: 'Sites' })
    },
    {
      title: 'Account',
      subtitle: 'angelovasile627@gmail.com',
      icon: '👤',
      onClick: null
    }
  ];

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-slate-800 text-white z-50 transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-slate-700 rounded transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="flex items-center justify-between p-4 hover:bg-slate-700 transition-colors border-b border-slate-700"
            >
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2 mb-1">
                  <span>{item.icon}</span>
                  <span className="font-medium">{item.title}</span>
                </div>
                {item.subtitle && (
                  <span className="text-sm text-gray-400 ml-7">{item.subtitle}</span>
                )}
              </div>
              <FiChevronRight className="text-gray-400" />
            </button>
          ))}
        </div>

        {/* Free AI Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <div className="text-sm">
            <div className="font-medium">Free AI</div>
            <div className="text-gray-400">1 generations left</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
