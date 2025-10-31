import React, { createContext, useState, useContext, useEffect } from 'react';

const BuilderContext = createContext();

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within BuilderProvider');
  }
  return context;
};

export const BuilderProvider = ({ children }) => {
  const [blocksPanelOpen, setBlocksPanelOpen] = useState(false);
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
  const [mobilePreview, setMobilePreview] = useState(false);
  const [centerPanelView, setCenterPanelView] = useState(null); // 'pages', 'sites', 'settings', null - Start with null (closed)
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  // History management for undo/redo
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // FTP settings
  const [ftpSettings, setFtpSettings] = useState({
    protocol: 'FTP',
    host: '',
    port: 21,
    username: '',
    password: '',
    rootFolder: ''
  });
  
  // Sites management
  const [sites, setSites] = useState([
    {
      id: '1',
      name: 'My Site',
      status: 'unpublished',
      pages: [
        {
          id: '1',
          name: 'Home',
          blocks: [],
          // Page settings
          pageUrl: 'index.html',
          pageDescription: '',
          socialSharingEnabled: true,
          socialSharingImageUrl: '',
          headCode: '',
          bodyEndCode: '',
          beforeDoctypeCode: ''
        }
      ]
    }
  ]);
  const [currentSiteId, setCurrentSiteId] = useState('1');
  const [currentPageId, setCurrentPageId] = useState('1');

  // Initialize history on first load
  useEffect(() => {
    if (history.length === 0) {
      setHistory([JSON.parse(JSON.stringify(sites))]);
      setHistoryIndex(0);
    }
  }, []);

  // Get current site and page
  const currentSite = sites.find(s => s.id === currentSiteId) || sites[0];
  const currentPage = currentSite?.pages.find(p => p.id === currentPageId) || currentSite?.pages[0];

  // Save to history for undo/redo
  const saveToHistory = (newSites) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newSites)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Undo/Redo functions
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setSites(JSON.parse(JSON.stringify(history[historyIndex - 1])));
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setSites(JSON.parse(JSON.stringify(history[historyIndex + 1])));
    }
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  // Block operations
  const addBlock = (block) => {
    setSites(prevSites => {
      const newSites = prevSites.map(site => {
        if (site.id === currentSiteId) {
          return {
            ...site,
            pages: site.pages.map(page => {
              if (page.id === currentPageId) {
                return {
                  ...page,
                  blocks: [...page.blocks, { ...block, id: Date.now().toString() }]
                };
              }
              return page;
            })
          };
        }
        return site;
      });
      saveToHistory(newSites);
      return newSites;
    });
  };

  const removeBlock = (blockId) => {
    setSites(prevSites => {
      const newSites = prevSites.map(site => {
        if (site.id === currentSiteId) {
          return {
            ...site,
            pages: site.pages.map(page => {
              if (page.id === currentPageId) {
                return {
                  ...page,
                  blocks: page.blocks.filter(b => b.id !== blockId)
                };
              }
              return page;
            })
          };
        }
        return site;
      });
      saveToHistory(newSites);
      return newSites;
    });
  };

  const updateBlock = (blockId, updates) => {
    setSites(prevSites => prevSites.map(site => {
      if (site.id === currentSiteId) {
        return {
          ...site,
          pages: site.pages.map(page => {
            if (page.id === currentPageId) {
              return {
                ...page,
                blocks: page.blocks.map(b => b.id === blockId ? { ...b, ...updates } : b)
              };
            }
            return page;
          })
        };
      }
      return site;
    }));
  };

  const reorderBlocks = (startIndex, endIndex) => {
    setSites(prevSites => prevSites.map(site => {
      if (site.id === currentSiteId) {
        return {
          ...site,
          pages: site.pages.map(page => {
            if (page.id === currentPageId) {
              const result = Array.from(page.blocks);
              const [removed] = result.splice(startIndex, 1);
              result.splice(endIndex, 0, removed);
              return { ...page, blocks: result };
            }
            return page;
          })
        };
      }
      return site;
    }));
  };

  // Page operations
  const addPage = (pageName) => {
    const newPage = {
      id: Date.now().toString(),
      name: pageName,
      blocks: [],
      // Page settings
      pageUrl: `${pageName.toLowerCase().replace(/\s+/g, '-')}.html`,
      pageDescription: '',
      socialSharingEnabled: true,
      socialSharingImageUrl: '',
      headCode: '',
      bodyEndCode: '',
      beforeDoctypeCode: ''
    };
    setSites(prevSites => prevSites.map(site => {
      if (site.id === currentSiteId) {
        return {
          ...site,
          pages: [...site.pages, newPage]
        };
      }
      return site;
    }));
    return newPage.id;
  };

  const removePage = (pageId) => {
    console.log('removePage called with pageId:', pageId);
    console.log('currentSiteId:', currentSiteId);
    console.log('currentPageId:', currentPageId);
    
    let newPageId = null;
    
    setSites(prevSites => {
      console.log('Previous sites:', prevSites);
      const newSites = prevSites.map(site => {
        if (site.id === currentSiteId) {
          console.log('Found current site, pages:', site.pages);
          const updatedPages = site.pages.filter(p => p.id !== pageId);
          console.log('Updated pages after filter:', updatedPages);
          
          // Determine the page to switch to if we're deleting the current page
          if (pageId === currentPageId && updatedPages.length > 0) {
            newPageId = updatedPages[0].id;
            console.log('Will switch to page:', newPageId);
          }
          
          return {
            ...site,
            pages: updatedPages
          };
        }
        return site;
      });
      
      console.log('New sites:', newSites);
      return newSites;
    });
    
    // Switch to the new page if needed
    if (newPageId) {
      console.log('Switching to new page:', newPageId);
      setCurrentPageId(newPageId);
    }
  };

  const updatePage = (pageId, updates) => {
    setSites(prevSites => prevSites.map(site => {
      if (site.id === currentSiteId) {
        return {
          ...site,
          pages: site.pages.map(p => p.id === pageId ? { ...p, ...updates } : p)
        };
      }
      return site;
    }));
  };

  // Update current page settings
  const updatePageSettings = (settings) => {
    updatePage(currentPageId, settings);
  };

  const switchPage = (pageId) => {
    setCurrentPageId(pageId);
  };

  // Duplicate page with all content and settings
  const duplicatePage = (pageId) => {
    const pageToDuplicate = currentSite.pages.find(p => p.id === pageId);
    if (!pageToDuplicate) return null;

    const newPage = {
      ...pageToDuplicate,
      id: Date.now().toString(),
      name: `${pageToDuplicate.name} Copy`,
      pageUrl: `${pageToDuplicate.pageUrl.replace('.html', '')}-copy.html`,
      blocks: pageToDuplicate.blocks.map(block => ({
        ...block,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      }))
    };

    setSites(prevSites => prevSites.map(site => {
      if (site.id === currentSiteId) {
        return {
          ...site,
          pages: [...site.pages, newPage]
        };
      }
      return site;
    }));

    return newPage.id;
  };

  // Site operations
  const addSite = (siteName) => {
    const newSite = {
      id: Date.now().toString(),
      name: siteName,
      status: 'unpublished',
      pages: [
        {
          id: Date.now().toString() + '-1',
          name: 'Home',
          blocks: [],
          // Page settings
          pageUrl: 'index.html',
          pageDescription: '',
          socialSharingEnabled: true,
          socialSharingImageUrl: '',
          headCode: '',
          bodyEndCode: '',
          beforeDoctypeCode: ''
        }
      ]
    };
    setSites(prev => [...prev, newSite]);
    return newSite.id;
  };

  const removeSite = (siteId) => {
    setSites(prev => prev.filter(s => s.id !== siteId));
    // Switch to first site if current site is deleted
    if (siteId === currentSiteId && sites.length > 1) {
      const remainingSites = sites.filter(s => s.id !== siteId);
      if (remainingSites.length > 0) {
        setCurrentSiteId(remainingSites[0].id);
        setCurrentPageId(remainingSites[0].pages[0].id);
      }
    }
  };

  const updateSite = (siteId, updates) => {
    setSites(prev => prev.map(s => s.id === siteId ? { ...s, ...updates } : s));
  };

  const switchSite = (siteId) => {
    setCurrentSiteId(siteId);
    const site = sites.find(s => s.id === siteId);
    if (site && site.pages.length > 0) {
      setCurrentPageId(site.pages[0].id);
    }
  };

  const value = {
    blocksPanelOpen,
    setBlocksPanelOpen,
    settingsPanelOpen,
    setSettingsPanelOpen,
    centerPanelView,
    setCenterPanelView,
    mobilePreview,
    setMobilePreview,
    publishDialogOpen,
    setPublishDialogOpen,
    previewMode,
    setPreviewMode,
    sites,
    currentSite,
    currentSiteId,
    currentPage,
    currentPageId,
    addBlock,
    removeBlock,
    updateBlock,
    reorderBlocks,
    addPage,
    removePage,
    updatePage,
    updatePageSettings,
    switchPage,
    duplicatePage,
    addSite,
    removeSite,
    updateSite,
    switchSite,
    // Undo/Redo
    undo,
    redo,
    canUndo,
    canRedo,
    // FTP Settings
    ftpSettings,
    setFtpSettings
  };

  return (
    <BuilderContext.Provider value={value}>
      {children}
    </BuilderContext.Provider>
  );
};
