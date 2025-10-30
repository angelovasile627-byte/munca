import React, { useState } from 'react';
import { FiX, FiPlus, FiTrash2, FiEdit2, FiCheck, FiGlobe } from 'react-icons/fi';
import { useBuilder } from '../context/BuilderContext';

const SitesPanel = () => {
  const { 
    sitesPanelOpen, 
    setSitesPanelOpen, 
    sites,
    currentSiteId,
    addSite,
    removeSite,
    updateSite,
    switchSite
  } = useBuilder();

  const [newSiteName, setNewSiteName] = useState('');
  const [editingSiteId, setEditingSiteId] = useState(null);
  const [editingName, setEditingName] = useState('');

  const handleAddSite = () => {
    if (newSiteName.trim()) {
      const newSiteId = addSite(newSiteName.trim());
      setNewSiteName('');
      // Optionally switch to the new site
      // switchSite(newSiteId);
    }
  };

  const handleDeleteSite = (siteId) => {
    if (sites.length > 1) {
      if (window.confirm('Sigur vrei să ștergi acest site? Toate paginile vor fi pierdute!')) {
        removeSite(siteId);
      }
    } else {
      alert('Nu poți șterge singurul site!');
    }
  };

  const handleStartEdit = (site) => {
    setEditingSiteId(site.id);
    setEditingName(site.name);
  };

  const handleSaveEdit = () => {
    if (editingName.trim()) {
      updateSite(editingSiteId, { name: editingName.trim() });
      setEditingSiteId(null);
      setEditingName('');
    }
  };

  const handleCancelEdit = () => {
    setEditingSiteId(null);
    setEditingName('');
  };

  const handleSelectSite = (siteId) => {
    switchSite(siteId);
    setSitesPanelOpen(false);
  };

  if (!sitesPanelOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setSitesPanelOpen(false)}
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Site-uri</h2>
          <button
            onClick={() => setSitesPanelOpen(false)}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
          >
            <FiX size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Add New Site */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={newSiteName}
              onChange={(e) => setNewSiteName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSite()}
              placeholder="Nume site nou..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleAddSite}
              disabled={!newSiteName.trim()}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <FiPlus size={20} />
              Creează
            </button>
          </div>
        </div>

        {/* Sites List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {sites.map((site) => (
              <div
                key={site.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  site.id === currentSiteId
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                {editingSiteId === site.id ? (
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
                      className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <button
                        onClick={() => handleSelectSite(site.id)}
                        className="flex-1 text-left"
                      >
                        <div className="flex items-center gap-2">
                          <FiGlobe className="text-green-600" size={20} />
                          <span className="font-semibold text-gray-800 text-lg">{site.name}</span>
                        </div>
                      </button>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleStartEdit(site)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Editează numele"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        {sites.length > 1 && (
                          <button
                            onClick={() => handleDeleteSite(site.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Șterge site-ul"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 ml-7">
                      <div>{site.pages.length} {site.pages.length === 1 ? 'pagină' : 'pagini'}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-block w-2 h-2 rounded-full ${
                          site.status === 'published' ? 'bg-green-500' : 'bg-gray-400'
                        }`}></span>
                        <span className="text-xs capitalize">{site.status === 'published' ? 'Publicat' : 'Nepublicat'}</span>
                      </div>
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
            Total: {sites.length} {sites.length === 1 ? 'site' : 'site-uri'}
          </div>
        </div>
      </div>
    </>
  );
};

export default SitesPanel;
