import React, { useState } from 'react';
import { useBuilder } from '../context/BuilderContext';
import { X, Plus, Edit2, Trash2, Check, Settings, Copy } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';

const PagesPanel = () => {
  const { 
    currentSite,
    currentPageId,
    addPage,
    removePage,
    updatePage,
    switchPage,
    duplicatePage,
    setSettingsPanelOpen
  } = useBuilder();

  const [isAddingPage, setIsAddingPage] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  const [editingPageId, setEditingPageId] = useState(null);
  const [editPageName, setEditPageName] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState(null);

  const handleAddPage = () => {
    if (newPageName.trim()) {
      addPage(newPageName);
      setNewPageName('');
      setIsAddingPage(false);
    }
  };

  const handleUpdatePage = (pageId) => {
    if (editPageName.trim()) {
      updatePage(pageId, { name: editPageName });
      setEditingPageId(null);
      setEditPageName('');
    }
  };

  const handleDeletePage = (pageId) => {
    if (currentSite.pages.length > 1) {
      setPageToDelete(pageId);
      setDeleteConfirmOpen(true);
    }
  };

  const confirmDeletePage = () => {
    if (pageToDelete) {
      removePage(pageToDelete);
      setPageToDelete(null);
    }
  };

  const startEditing = (page) => {
    setEditingPageId(page.id);
    setEditPageName(page.name);
  };

  const handleDuplicatePage = (pageId) => {
    const newPageId = duplicatePage(pageId);
    if (newPageId) {
      switchPage(newPageId);
    }
  };

  return (
    <div className="w-80 bg-gray-800 h-full flex flex-col border-r border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Pagini</h2>
        <p className="text-sm text-gray-400 mt-1">Titlul paginii: {currentSite.name}</p>
      </div>

      {/* Add New Page Button */}
      <div className="p-4 border-b border-gray-700">
        {!isAddingPage ? (
          <button
            onClick={() => setIsAddingPage(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors border-2 border-dashed border-blue-400"
          >
            <Plus className="w-5 h-5" />
            Crează Pagină Nouă
          </button>
        ) : (
          <div className="space-y-2">
            <input
              type="text"
              value={newPageName}
              onChange={(e) => setNewPageName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddPage()}
              placeholder="Nume pagină"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddPage}
                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
              >
                Adaugă
              </button>
              <button
                onClick={() => {
                  setIsAddingPage(false);
                  setNewPageName('');
                }}
                className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm"
              >
                Anulează
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pages List */}
      <div className="flex-1 overflow-y-auto">
        {currentSite.pages.map(page => (
          <div
            key={page.id}
            className={`p-4 border-b border-gray-700 hover:bg-gray-750 cursor-pointer transition-colors ${
              page.id === currentPageId ? 'bg-blue-900 border-l-4 border-l-blue-500' : ''
            }`}
          >
            {editingPageId === page.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editPageName}
                  onChange={(e) => setEditPageName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUpdatePage(page.id)}
                  className="w-full px-2 py-1 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500 text-sm"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdatePage(page.id)}
                    className="flex-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs flex items-center justify-center gap-1"
                  >
                    <Check className="w-3 h-3" />
                    Salvează
                  </button>
                  <button
                    onClick={() => {
                      setEditingPageId(null);
                      setEditPageName('');
                    }}
                    className="flex-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-xs"
                  >
                    Anulează
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between group">
                <div
                  onClick={() => switchPage(page.id)}
                  className="flex items-center gap-3 flex-1"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white">
                    🏠
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{page.name}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      switchPage(page.id);
                      setSettingsPanelOpen(true);
                    }}
                    className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
                    title="Setări"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDuplicatePage(page.id);
                    }}
                    className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
                    title="Duplică pagina"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(page);
                    }}
                    className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
                    title="Editează"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePage(page.id);
                    }}
                    className="p-1 hover:bg-gray-700 rounded text-red-400 hover:text-red-300"
                    title="Șterge"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => {
          setDeleteConfirmOpen(false);
          setPageToDelete(null);
        }}
        onConfirm={confirmDeletePage}
        title="Șterge Pagina"
        message="Sigur doriți să ștergeți această pagină? Această acțiune nu poate fi anulată."
      />
    </div>
  );
};

export default PagesPanel;
