import React, { useState } from 'react';
import { FiX, FiPlus, FiTrash2, FiEdit2, FiCheck } from 'react-icons/fi';
import { useBuilder } from '../context/BuilderContext';

const PagesPanel = () => {
  const { 
    pagesPanelOpen, 
    setPagesPanelOpen, 
    currentSite,
    currentPageId,
    addPage,
    removePage,
    updatePage,
    switchPage
  } = useBuilder();

  const [newPageName, setNewPageName] = useState('');
  const [editingPageId, setEditingPageId] = useState(null);
  const [editingName, setEditingName] = useState('');

  const handleAddPage = () => {
    if (newPageName.trim()) {
      addPage(newPageName.trim());
      setNewPageName('');
    }
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

  const handleSelectPage = (pageId) => {
    switchPage(pageId);
    setPagesPanelOpen(false);
  };

  if (!pagesPanelOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setPagesPanelOpen(false)}
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Pagini</h2>
          <button
            onClick={() => setPagesPanelOpen(false)}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
          >
            <FiX size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Add New Page */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={newPageName}
              onChange={(e) => setNewPageName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddPage()}
              placeholder="Nume pagină nouă..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddPage}
              disabled={!newPageName.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <FiPlus size={20} />
              Adaugă
            </button>
          </div>
        </div>

        {/* Pages List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {currentSite?.pages.map((page) => (
              <div
                key={page.id}
                className={`p-3 rounded-lg border-2 transition-all ${
                  page.id === currentPageId
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                {editingPageId === page.id ? (
                  // Edit Mode
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') handleSaveEdit();
                        if (e.key === 'Escape') handleCancelEdit();
                      }}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveEdit}
                      className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                    >
                      <FiCheck size={18} />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <FiX size={18} />
                    </button>
                  </div>
                ) : (
                  // View Mode
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleSelectPage(page.id)}
                      className="flex-1 text-left"
                    >
                      <div className="font-medium text-gray-800">{page.name}</div>
                      <div className="text-sm text-gray-500">
                        {page.blocks.length} {page.blocks.length === 1 ? 'bloc' : 'blocuri'}
                      </div>
                    </button>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleStartEdit(page)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Editează numele"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      {currentSite.pages.length > 1 && (
                        <button
                          onClick={() => handleDeletePage(page.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Șterge pagina"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            Total: {currentSite?.pages.length} {currentSite?.pages.length === 1 ? 'pagină' : 'pagini'}
          </div>
        </div>
      </div>
    </>
  );
};

export default PagesPanel;
