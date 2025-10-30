import React, { useState } from 'react';
import { FiX, FiChevronRight, FiChevronLeft, FiPlus, FiHome, FiSettings, FiCopy, FiTrash2, FiEdit2, FiCheck } from 'react-icons/fi';
import { useBuilder } from '../context/BuilderContext';

const Sidebar = () => {
  const { 
    sidebarOpen, 
    setSidebarOpen, 
    currentPage, 
    currentSite,
    sites,
    addPage,
    removePage,
    updatePage,
    switchPage,
    addSite,
    removeSite,
    updateSite,
    switchSite
  } = useBuilder();

  const [currentView, setCurrentView] = useState('main'); // 'main', 'pages', 'sites', 'page-settings'
  const [selectedPageForSettings, setSelectedPageForSettings] = useState(null);
  const [newPageName, setNewPageName] = useState('');
  const [newSiteName, setNewSiteName] = useState('');
  const [editingPageId, setEditingPageId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [pageSettings, setPageSettings] = useState({
    title: '',
    description: '',
    url: ''
  });

  const handleBack = () => {
    if (currentView === 'page-settings') {
      setCurrentView('pages');
      setSelectedPageForSettings(null);
    } else if (currentView === 'pages' || currentView === 'sites') {
      setCurrentView('main');
    }
  };

  const handleMenuClick = (view) => {
    setCurrentView(view);
  };

  const handlePageSettingsClick = (page) => {
    setSelectedPageForSettings(page);
    setPageSettings({
      title: page.name,
      description: page.description || '',
      url: page.url || 'index.html'
    });
    setCurrentView('page-settings');
  };

  const handleAddPage = () => {
    if (newPageName.trim()) {
      addPage(newPageName.trim());
      setNewPageName('');
    }
  };

  const handleAddSite = () => {
    if (newSiteName.trim()) {
      addSite(newSiteName.trim());
      setNewSiteName('');
    }
  };

  const handleSelectPage = (pageId) => {
    switchPage(pageId);
    setSidebarOpen(false);
  };

  const handleSelectSite = (siteId) => {
    switchSite(siteId);
    setSidebarOpen(false);
    setCurrentView('main');
  };

  const handleStartEdit = (page) => {
    setEditingPageId(page.id);
    setEditingName(page.name);
  };

  const handleSaveEdit = () => {
    if (editingName.trim()) {
      updatePage(editingPageId, { name: editingName.trim() });
      setEditingPageId(null);
      setEditingName('');
    }
  };

  const handleCancelEdit = () => {
    setEditingPageId(null);
    setEditingName('');
  };

  const handleDeletePage = (pageId) => {
    if (currentSite.pages.length > 1) {
      if (window.confirm('Sigur vrei să ștergi această pagină?')) {
        removePage(pageId);
      }
    } else {
      alert('Nu poți șterge singura pagină!');
    }
  };

  const handleDeleteSite = (siteId) => {
    if (sites.length > 1) {
      if (window.confirm('Sigur vrei să ștergi acest site?')) {
        removeSite(siteId);
      }
    } else {
      alert('Nu poți șterge singurul site!');
    }
  };

  const menuItems = [
    {
      title: 'Pagini',
      subtitle: currentPage?.name || 'Home',
      icon: '📄',
      onClick: () => handleMenuClick('pages')
    },
    {
      title: 'Site-uri',
      subtitle: currentSite?.name || 'My Site',
      icon: '🌐',
      onClick: () => handleMenuClick('sites')
    },
    {
      title: 'Cont',
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
              onClick={item.onClick}
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
              {item.onClick && <FiChevronRight className="text-gray-400" />}
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
