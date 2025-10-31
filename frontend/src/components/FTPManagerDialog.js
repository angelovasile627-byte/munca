import React, { useState } from 'react';
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useBuilder } from '../context/BuilderContext';

const FTPManagerDialog = ({ isOpen, onClose }) => {
  const { ftpSettings, setFtpSettings } = useBuilder();
  const [localSettings, setLocalSettings] = useState({
    ...ftpSettings
  });
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  if (!isOpen) return null;

  const handleSave = () => {
    setFtpSettings(localSettings);
    alert('FTP settings saved successfully!');
    onClose();
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
      const response = await fetch(`${backendUrl}/api/ftp/test-connection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(localSettings),
      });

      const data = await response.json();
      
      if (response.ok) {
        setTestResult({ success: true, message: data.message || 'Connection successful!' });
      } else {
        setTestResult({ success: false, message: data.detail || 'Connection failed' });
      }
    } catch (error) {
      setTestResult({ success: false, message: `Error: ${error.message}` });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div className="bg-slate-800 rounded-lg w-full max-w-3xl p-6 text-white max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">FTP Site Manager</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded transition-colors"
            aria-label="Close"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Saved Connections (Future Enhancement) */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <select className="flex-1 px-4 py-2 bg-slate-700 rounded border border-slate-600 focus:border-indigo-500 focus:outline-none">
              <option>Selectează conexiune salvată...</option>
            </select>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded transition-colors flex items-center gap-2">
              <FiPlus size={16} />
              <span>ADAUGĂ NOU</span>
            </button>
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors flex items-center gap-2">
              <FiTrash2 size={16} />
              <span>ÎNDEPĂRTARE</span>
            </button>
          </div>
        </div>

        {/* FTP Settings Form */}
        <div className="space-y-4">
          {/* Protocol and Port */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Protocol</label>
              <select
                value={localSettings.protocol}
                onChange={(e) => setLocalSettings({ ...localSettings, protocol: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 rounded border border-slate-600 focus:border-indigo-500 focus:outline-none"
              >
                <option value="FTP">FTP</option>
                <option value="FTPS">FTPS</option>
                <option value="SFTP">SFTP</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">
                Host (e.g. ftp.domain.com)
              </label>
              <input
                type="text"
                value={localSettings.host}
                onChange={(e) => setLocalSettings({ ...localSettings, host: e.target.value })}
                placeholder="ftp.example.com"
                className="w-full px-4 py-2 bg-slate-700 rounded border border-slate-600 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Port */}
          <div>
            <label className="block text-sm font-medium mb-2">Port</label>
            <input
              type="number"
              value={localSettings.port}
              onChange={(e) => setLocalSettings({ ...localSettings, port: parseInt(e.target.value) || 21 })}
              className="w-full px-4 py-2 bg-slate-700 rounded border border-slate-600 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Username and Password */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={localSettings.username}
                onChange={(e) => setLocalSettings({ ...localSettings, username: e.target.value })}
                placeholder="username"
                className="w-full px-4 py-2 bg-slate-700 rounded border border-slate-600 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={localSettings.password}
                onChange={(e) => setLocalSettings({ ...localSettings, password: e.target.value })}
                placeholder="password"
                className="w-full px-4 py-2 bg-slate-700 rounded border border-slate-600 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Root Folder */}
          <div>
            <label className="block text-sm font-medium mb-2">
              [root folder]
            </label>
            <input
              type="text"
              value={localSettings.rootFolder}
              onChange={(e) => setLocalSettings({ ...localSettings, rootFolder: e.target.value })}
              placeholder="/public_html"
              className="w-full px-4 py-2 bg-slate-700 rounded border border-slate-600 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Test Connection Result */}
          {testResult && (
            <div
              className={`p-4 rounded ${
                testResult.success ? 'bg-green-900 border border-green-700' : 'bg-red-900 border border-red-700'
              }`}
            >
              <p className="font-medium">
                {testResult.success ? '✅ Success' : '❌ Failed'}
              </p>
              <p className="text-sm mt-1">{testResult.message}</p>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-600">
          <button
            onClick={handleTestConnection}
            disabled={isTesting}
            className={`px-6 py-2 rounded transition-colors ${
              isTesting
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            {isTesting ? 'TESTING...' : 'TEST CONNECTION'}
          </button>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-slate-600 hover:bg-slate-500 rounded transition-colors"
            >
              ANULEAZĂ
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded transition-colors"
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FTPManagerDialog;
