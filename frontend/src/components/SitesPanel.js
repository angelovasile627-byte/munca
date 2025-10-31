import React, { useState } from 'react';
import { useBuilder } from '../context/BuilderContext';
import { X, Plus, Edit2, Trash2, Check, Globe } from 'lucide-react';

const SitesPanel = () => {
  const { 
    sites,
    currentSiteId,
    addSite,
    removeSite,
    updateSite,
    switchSite
  } = useBuilder();

  const [isAddingSite, setIsAddingSite] = useState(false);
  const [newSiteName, setNewSiteName] = useState('');
  const [editingSiteId, setEditingSiteId] = useState(null);
  const [editSiteName, setEditSiteName] = useState('');

  const handleAddSite = () => {
    if (newSiteName.trim()) {
      addSite(newSiteName);
      setNewSiteName('');
      setIsAddingSite(false);
    }
  };

  const handleUpdateSite = (siteId) => {
    if (editSiteName.trim()) {
      updateSite(siteId, { name: editSiteName });
      setEditingSiteId(null);
      setEditSiteName('');
    }
  };

  const handleDeleteSite = (siteId) => {
    if (sites.length > 1) {
      if (window.confirm('Are you sure you want to delete this site?')) {
        removeSite(siteId);
      }
    } else {
      alert('Cannot delete the last site!');
    }
  };

  const startEditing = (site) => {
    setEditingSiteId(site.id);
    setEditSiteName(site.name);
  };

  return (
    <div className="w-80 bg-gray-800 h-full flex flex-col border-r border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Site-uri</h2>
        <p className="text-sm text-gray-400 mt-1">Gestionează site-urile tale</p>
      </div>

      {/* Add New Site Button */}
      <div className="p-4 border-b border-gray-700">
        {!isAddingSite ? (
          <button
            onClick={() => setIsAddingSite(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors border-2 border-dashed border-blue-400"
          >
            <Plus className="w-5 h-5" />
            Crează Site Nou
          </button>
        ) : (
          <div className="space-y-2">
            <input
              type="text"
              value={newSiteName}
              onChange={(e) => setNewSiteName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSite()}
              placeholder="Nume site"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddSite}
                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
              >
                Adaugă
              </button>
              <button
                onClick={() => {
                  setIsAddingSite(false);
                  setNewSiteName('');
                }}
                className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm"
              >
                Anulează
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sites List */}
      <div className="flex-1 overflow-y-auto">
        {sites.map(site => (
          <div
            key={site.id}
            className={`p-4 border-b border-gray-700 hover:bg-gray-750 cursor-pointer transition-colors ${
              site.id === currentSiteId ? 'bg-blue-900 border-l-4 border-l-blue-500' : ''
            }`}
          >
            {editingSiteId === site.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editSiteName}
                  onChange={(e) => setEditSiteName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUpdateSite(site.id)}
                  className="w-full px-2 py-1 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500 text-sm"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateSite(site.id)}
                    className="flex-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs flex items-center justify-center gap-1"
                  >
                    <Check className="w-3 h-3" />
                    Salvează
                  </button>
                  <button
                    onClick={() => {
                      setEditingSiteId(null);
                      setEditSiteName('');
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
                  onClick={() => switchSite(site.id)}
                  className="flex items-center gap-3 flex-1"
                >
                  <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{site.name}</h3>
                    <p className="text-xs text-gray-400">
                      {site.pages.length} {site.pages.length === 1 ? 'pagină' : 'pagini'} • {
                        site.status === 'published' ? 'Publicat' : 'Nepublicat'
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => startEditing(site)}
                    className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
                    title="Editează"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteSite(site.id)}
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
    </div>
  );
};

export default SitesPanel;
