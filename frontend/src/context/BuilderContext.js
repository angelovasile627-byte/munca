import React, { createContext, useState, useContext } from 'react';

const BuilderContext = createContext();

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within BuilderProvider');
  }
  return context;
};

export const BuilderProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [blocksPanelOpen, setBlocksPanelOpen] = useState(false);
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
  const [mobilePreview, setMobilePreview] = useState(false);
  const [currentSite, setCurrentSite] = useState({
    id: '1',
    name: 'My Site',
    status: 'unpublished'
  });
  const [currentPage, setCurrentPage] = useState({
    id: '1',
    name: 'Home',
    blocks: []
  });

  const addBlock = (block) => {
    setCurrentPage(prev => ({
      ...prev,
      blocks: [...prev.blocks, { ...block, id: Date.now().toString() }]
    }));
  };

  const removeBlock = (blockId) => {
    setCurrentPage(prev => ({
      ...prev,
      blocks: prev.blocks.filter(b => b.id !== blockId)
    }));
  };

  const updateBlock = (blockId, updates) => {
    setCurrentPage(prev => ({
      ...prev,
      blocks: prev.blocks.map(b => b.id === blockId ? { ...b, ...updates } : b)
    }));
  };

  const reorderBlocks = (startIndex, endIndex) => {
    const result = Array.from(currentPage.blocks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    
    setCurrentPage(prev => ({ ...prev, blocks: result }));
  };

  const value = {
    sidebarOpen,
    setSidebarOpen,
    blocksPanelOpen,
    setBlocksPanelOpen,
    settingsPanelOpen,
    setSettingsPanelOpen,
    mobilePreview,
    setMobilePreview,
    currentSite,
    setCurrentSite,
    currentPage,
    setCurrentPage,
    addBlock,
    removeBlock,
    updateBlock,
    reorderBlocks
  };

  return (
    <BuilderContext.Provider value={value}>
      {children}
    </BuilderContext.Provider>
  );
};
