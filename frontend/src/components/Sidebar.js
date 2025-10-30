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

  // Render Main Menu
  const renderMainMenu = () => (
    <>
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <button
          onClick={() => setSidebarOpen(false)}
          className="p-2 hover:bg-slate-700 rounded transition-colors"
        >
          <FiX size={24} />
        </button>
      </div>
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
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
        <div className="text-sm">
          <div className="font-medium">Free AI</div>
          <div className="text-gray-400">1 generations left</div>
        </div>
      </div>
    </>
  );

  // Render Pages View
  const renderPagesView = () => (
    <>
      <div className="flex items-center gap-3 p-4 border-b border-slate-700">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-slate-700 rounded transition-colors"
        >
          <FiChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-semibold">Pagini</h2>
      </div>

      <div className="p-4 border-b border-slate-700">
        <button
          onClick={() => {
            const name = prompt('Nume pagină nouă:');
            if (name && name.trim()) {
              addPage(name.trim());
            }
          }}
          className="w-full flex items-center justify-center gap-2 p-3 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
        >
          <FiPlus size={20} />
          <span>Creează Pagină Nouă</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {currentSite?.pages.map((page) => (
          <div
            key={page.id}
            className={`flex items-center justify-between p-4 border-b border-slate-700 hover:bg-slate-700 transition-colors ${
              page.id === currentPage?.id ? 'bg-slate-700' : ''
            }`}
          >
            <button
              onClick={() => handleSelectPage(page.id)}
              className="flex items-center gap-3 flex-1"
            >
              <FiHome size={20} className="text-red-400" />
              <span className="font-medium">{page.name}</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const newPage = {
                    ...page,
                    id: Date.now().toString(),
                    name: page.name + ' Copy'
                  };
                  addPage(newPage.name);
                }}
                className="p-2 hover:bg-slate-600 rounded transition-colors"
                title="Clonează pagină"
              >
                <FiCopy size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePageSettingsClick(page);
                }}
                className="p-2 hover:bg-slate-600 rounded transition-colors"
                title="Setări pagină"
              >
                <FiSettings size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  // Render Sites View
  const renderSitesView = () => (
    <>
      <div className="flex items-center gap-3 p-4 border-b border-slate-700">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-slate-700 rounded transition-colors"
        >
          <FiChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-semibold">Site-uri</h2>
      </div>

      <div className="p-4 border-b border-slate-700">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
        />
        <div className="text-sm text-gray-400 mb-3">
          {sites.length} of 3 sites created
        </div>
      </div>

      <div className="p-4 border-b border-slate-700">
        <button
          onClick={() => {
            const name = prompt('Nume site nou:');
            if (name && name.trim()) {
              addSite(name.trim());
            }
          }}
          className="w-full flex flex-col items-center justify-center gap-2 p-8 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
        >
          <FiPlus size={32} />
          <span className="text-lg">Crează Site nou</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {sites.map((site) => (
          <button
            key={site.id}
            onClick={() => handleSelectSite(site.id)}
            className={`w-full flex items-center justify-between p-4 border-b border-slate-700 hover:bg-slate-700 transition-colors ${
              site.id === currentSite?.id ? 'bg-slate-700' : ''
            }`}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">{site.name}</span>
              <span className="text-sm text-gray-400">
                {site.pages.length} {site.pages.length === 1 ? 'pagină' : 'pagini'}
              </span>
            </div>
            <FiChevronRight className="text-gray-400" />
          </button>
        ))}
      </div>
    </>
  );

  // Render Page Settings View
  const renderPageSettingsView = () => (
    <>
      <div className="flex items-center gap-3 p-4 border-b border-slate-700">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-slate-700 rounded transition-colors"
        >
          <FiChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-semibold">Setări pagină</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Titlul paginii:</label>
          <input
            type="text"
            value={pageSettings.title}
            onChange={(e) => setPageSettings({ ...pageSettings, title: e.target.value })}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Descrierea paginii:</label>
          <textarea
            value={pageSettings.description}
            onChange={(e) => setPageSettings({ ...pageSettings, description: e.target.value })}
            rows="3"
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">URL-ul paginii:</label>
          <input
            type="text"
            value={pageSettings.url}
            onChange={(e) => setPageSettings({ ...pageSettings, url: e.target.value })}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-400 mt-1">
            This is the default site page. Don't rename it unless you have another index.html file.
          </p>
        </div>

        <div className="pt-4">
          <button
            onClick={() => {
              if (selectedPageForSettings) {
                updatePage(selectedPageForSettings.id, {
                  name: pageSettings.title,
                  description: pageSettings.description,
                  url: pageSettings.url
                });
              }
              handleBack();
            }}
            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white font-medium transition-colors"
          >
            Salvează
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
