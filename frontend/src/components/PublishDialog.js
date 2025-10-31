import React, { useState, useRef } from 'react';
import { FiX, FiDownload, FiServer, FiSettings, FiSave, FiFolderPlus } from 'react-icons/fi';
import { useBuilder } from '../context/BuilderContext';
import { useToast } from '../context/ToastContext';
import FTPManagerDialog from './FTPManagerDialog';

const PublishDialog = () => {
  const { publishDialogOpen, setPublishDialogOpen, currentSite, currentPage, sites, setSites, setCurrentSiteId, setCurrentPageId } = useBuilder();
  const { showSuccess, showError, showInfo } = useToast();
  const [publishMethod, setPublishMethod] = useState('project'); // 'project', 'local', 'ftp'
  const [publishOnlyChanges, setPublishOnlyChanges] = useState(false);
  const [ftpManagerOpen, setFtpManagerOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const fileInputRef = useRef(null);

  if (!publishDialogOpen) return null;

  const handleExportProject = async () => {
    try {
      setIsPublishing(true);
      
      // Create project data with all sites
      const projectData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        sites: sites,
        metadata: {
          appName: 'Mobirise Builder Clone',
          totalSites: sites.length,
          totalPages: sites.reduce((sum, site) => sum + site.pages.length, 0)
        }
      };

      // Convert to JSON and create blob
      const jsonString = JSON.stringify(projectData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `proiect.${currentSite.name.replace(/\s+/g, '_')}.mbp`;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      showSuccess(`Proiect salvat: ${a.download}`);
      setPublishDialogOpen(false);
    } catch (error) {
      console.error('Export error:', error);
      showError('Eroare la salvarea proiectului!');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleImportProject = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const projectData = JSON.parse(e.target.result);
        
        // Validate project data
        if (!projectData.sites || !Array.isArray(projectData.sites)) {
          showError('Fișier de proiect invalid!');
          return;
        }

        // Load all sites from project
        setSites(projectData.sites);
        
        // Set current site and page to first ones
        if (projectData.sites.length > 0) {
          setCurrentSiteId(projectData.sites[0].id);
          if (projectData.sites[0].pages.length > 0) {
            setCurrentPageId(projectData.sites[0].pages[0].id);
          }
        }

        setPublishDialogOpen(false);
        showSuccess(`Proiect încărcat: ${projectData.metadata.totalSites} site-uri, ${projectData.metadata.totalPages} pagini`);
      } catch (error) {
        console.error('Import error:', error);
        showError('Eroare la încărcarea proiectului!');
      }
    };
    
    reader.readAsText(file);
    
    // Reset input
    event.target.value = '';
  };

  const handlePublish = async () => {
    if (publishMethod === 'project') {
      await handleExportProject();
      return;
    }
    
    setIsPublishing(true);
    
    try {
      if (publishMethod === 'local') {
        // Download as ZIP
        const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
        const response = await fetch(
          `${backendUrl}/api/sites/${currentSite.id}/export-zip`,
          {
            method: 'GET',
          }
        );

        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${currentSite.name.replace(/\s+/g, '-')}.zip`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          
          setPublishDialogOpen(false);
        } else {
          alert('Failed to export site');
        }
      } else if (publishMethod === 'ftp') {
        // Upload via FTP
        const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
        const response = await fetch(
          `${backendUrl}/api/sites/${currentSite.id}/publish-ftp`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              onlyChanges: publishOnlyChanges,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          alert(`Site published successfully via FTP!\n${data.message || ''}`);
          setPublishDialogOpen(false);
        } else {
          const error = await response.json();
          alert(`Failed to publish via FTP: ${error.detail || 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.error('Publish error:', error);
      alert(`Error during publishing: ${error.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-slate-800 rounded-lg w-full max-w-2xl p-6 text-white">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Publicare</h2>
            <button
              onClick={() => setPublishDialogOpen(false)}
              className="p-2 hover:bg-slate-700 rounded transition-colors"
              aria-label="Close"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4">
            {/* Publishing Methods */}
            <div className="space-y-3">
              {/* Save Project Option */}
              <label className="flex items-center gap-3 p-4 bg-slate-700 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors border-2 border-blue-500">
                <input
                  type="radio"
                  name="publishMethod"
                  value="project"
                  checked={publishMethod === 'project'}
                  onChange={(e) => setPublishMethod(e.target.value)}
                  className="w-5 h-5"
                />
                <FiSave size={24} className="text-blue-400" />
                <div className="flex-1">
                  <div className="font-medium">💾 Salvează Proiect Complet</div>
                  <div className="text-sm text-gray-400">
                    Salvează toate site-urile, paginile, blocurile și setările într-un fișier .mbp
                  </div>
                </div>
              </label>

              {/* Load Project Option */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-3 p-4 bg-slate-700 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors border-2 border-green-500"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".mbp,.json"
                  onChange={handleImportProject}
                  className="hidden"
                />
                <FiFolderPlus size={24} className="text-green-400" />
                <div className="flex-1">
                  <div className="font-medium">📂 Încarcă Proiect</div>
                  <div className="text-sm text-gray-400">
                    Deschide un proiect salvat anterior (fișier .mbp)
                  </div>
                </div>
              </div>

              {/* Local Folder Option */}
              <label className="flex items-center gap-3 p-4 bg-slate-700 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors">
                <input
                  type="radio"
                  name="publishMethod"
                  value="local"
                  checked={publishMethod === 'local'}
                  onChange={(e) => setPublishMethod(e.target.value)}
                  className="w-5 h-5"
                />
                <FiDownload size={24} className="text-purple-400" />
                <div className="flex-1">
                  <div className="font-medium">Export HTML (ZIP)</div>
                  <div className="text-sm text-gray-400">
                    Descarcă doar site-ul curent ca fișier ZIP HTML
                  </div>
                </div>
              </label>

              {/* FTP Option */}
              <label className="flex items-center gap-3 p-4 bg-slate-700 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors">
                <input
                  type="radio"
                  name="publishMethod"
                  value="ftp"
                  checked={publishMethod === 'ftp'}
                  onChange={(e) => setPublishMethod(e.target.value)}
                  className="w-5 h-5"
                />
                <FiServer size={24} className="text-purple-400" />
                <div className="flex-1">
                  <div className="font-medium">FTP</div>
                  <div className="text-sm text-gray-400">
                    Publică direct pe server prin FTP
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setFtpManagerOpen(true);
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded transition-colors flex items-center gap-2"
                >
                  <FiSettings size={16} />
                  <span>EDITARE</span>
                </button>
              </label>
            </div>

            {/* Publish Only Changes Toggle */}
            {publishMethod === 'ftp' && (
              <div className="flex items-center gap-3 p-4 bg-slate-700 rounded-lg">
                <input
                  type="checkbox"
                  id="publishOnlyChanges"
                  checked={publishOnlyChanges}
                  onChange={(e) => setPublishOnlyChanges(e.target.checked)}
                  className="w-5 h-5"
                />
                <label htmlFor="publishOnlyChanges" className="cursor-pointer">
                  Publică doar schimbările
                </label>
              </div>
            )}

            {/* Help Text */}
            {publishMethod === 'project' && (
              <div className="text-sm text-gray-300 bg-blue-900 bg-opacity-30 p-4 rounded-lg border border-blue-600">
                <p className="font-semibold mb-2">📌 Cum funcționează:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  <li>Se salvează fișierul cu format: <code className="text-blue-300">proiect.numele_site.mbp</code></li>
                  <li>Conține toate site-urile, paginile, blocurile și setările</li>
                  <li>Pentru a încărca: apasă "Încarcă Proiect" și selectează fișierul .mbp</li>
                  <li>Proiectul va fi restaurat exact cum l-ai salvat, chiar și după ani</li>
                </ul>
              </div>
            )}
            {publishMethod === 'local' && (
              <div className="text-sm text-gray-400 bg-slate-700 p-4 rounded-lg">
                Exportă doar HTML-ul site-ului curent, fără setările de proiect.
              </div>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-slate-600">
            <button
              onClick={() => setPublishDialogOpen(false)}
              className="px-6 py-2 bg-slate-600 hover:bg-slate-500 rounded transition-colors"
            >
              ANULEAZĂ
            </button>
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className={`px-6 py-2 rounded transition-colors ${
                isPublishing
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isPublishing 
                ? 'SE PROCESEAZĂ...' 
                : publishMethod === 'project' 
                  ? '💾 SALVEAZĂ PROIECT' 
                  : 'PUBLICARE'
              }
            </button>
          </div>
        </div>
      </div>

      {/* FTP Manager Dialog */}
      {ftpManagerOpen && (
        <FTPManagerDialog
          isOpen={ftpManagerOpen}
          onClose={() => setFtpManagerOpen(false)}
        />
      )}
    </>
  );
};

export default PublishDialog;
