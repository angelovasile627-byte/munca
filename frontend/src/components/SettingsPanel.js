import React, { useState, useEffect, useRef } from 'react';
import { FiX, FiUpload, FiDownload, FiImage } from 'react-icons/fi';
import { useBuilder } from '../context/BuilderContext';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';

const SettingsPanel = () => {
  const { settingsPanelOpen, setSettingsPanelOpen, currentPage, updatePageSettings, currentSite } = useBuilder();
  
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    name: '',
    pageUrl: '',
    pageDescription: '',
    socialSharingEnabled: true,
    socialSharingImageUrl: '',
    headCode: '',
    bodyEndCode: '',
    beforeDoctypeCode: ''
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Update settings when currentPage changes
  useEffect(() => {
    if (currentPage) {
      setSettings({
        name: currentPage.name || '',
        pageUrl: currentPage.pageUrl || 'index.html',
        pageDescription: currentPage.pageDescription || '',
        socialSharingEnabled: currentPage.socialSharingEnabled ?? true,
        socialSharingImageUrl: currentPage.socialSharingImageUrl || '',
        headCode: currentPage.headCode || '',
        bodyEndCode: currentPage.bodyEndCode || '',
        beforeDoctypeCode: currentPage.beforeDoctypeCode || ''
      });
    }
  }, [currentPage]);

  const handleInputChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updatePageSettings(settings);
    alert('Settings saved successfully!');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/upload-image`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      handleInputChange('socialSharingImageUrl', data.imageUrl);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleExportHTML = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(
        `${backendUrl}/sites/${currentSite.id}/pages/${currentPage.id}/export`
      );

      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentPage.name || 'page'}.html`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export HTML');
    }
  };

  return (
    <div className="w-full h-full bg-gray-800 shadow-2xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900">
        <h2 className="text-lg font-bold text-white">Setări pagină</h2>
        <div className="flex gap-2">
          <button
            onClick={handleExportHTML}
            className="p-2 hover:bg-gray-700 rounded transition-colors text-white"
            title="Export HTML"
          >
            <FiDownload size={20} />
          </button>
          <button
            onClick={() => setSettingsPanelOpen(false)}
            className="p-2 hover:bg-gray-700 rounded transition-colors text-white"
          >
            <FiX size={24} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700 bg-gray-900">
        <button
          onClick={() => setActiveTab('general')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'general'
              ? 'bg-gray-800 border-b-2 border-blue-500 text-blue-400'
              : 'text-gray-400 hover:bg-gray-800'
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab('seo')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'seo'
              ? 'bg-gray-800 border-b-2 border-blue-500 text-blue-400'
              : 'text-gray-400 hover:bg-gray-800'
          }`}
        >
          SEO
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'code'
              ? 'bg-gray-800 border-b-2 border-blue-500 text-blue-400'
              : 'text-gray-400 hover:bg-gray-800'
          }`}
        >
          Code Injection
        </button>
      </div>

      {/* Settings Content */}
      <div className="p-6 overflow-y-auto flex-1">
        {/* GENERAL TAB */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            {/* Page Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Titlul paginii:
              </label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Page URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                URL-ul paginii:
              </label>
              <input
                type="text"
                value={settings.pageUrl}
                onChange={(e) => handleInputChange('pageUrl', e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-400 mt-1">
                This is the default site page. Don't rename it unless you have another index.html file.
              </p>
            </div>

            {/* Page Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Descrierea paginii:
              </label>
              <textarea
                rows={3}
                value={settings.pageDescription}
                onChange={(e) => handleInputChange('pageDescription', e.target.value)}
                placeholder="Enter page description..."
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* SEO TAB */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            {/* Google Preview */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Google Preview:
              </label>
              <div className="border border-gray-600 rounded-lg p-4 bg-gray-700">
                <div className="flex gap-2 mb-3">
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">DESKTOP</button>
                  <button className="px-3 py-1 text-sm bg-gray-600 text-gray-300 rounded">MOBILE</button>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="text-blue-600 text-sm mb-1">{settings.name || 'Home'}</div>
                  <div className="text-gray-500 text-xs">https://yoursite.com/</div>
                  <div className="text-gray-600 text-sm mt-2">
                    {settings.pageDescription || 'Your page description will appear here...'}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Sharing Image */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-300">
                  Social Sharing Image:
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.socialSharingEnabled}
                    onChange={(e) => handleInputChange('socialSharingEnabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {settings.socialSharingEnabled && (
                <>
                  {settings.socialSharingImageUrl ? (
                    <div className="relative">
                      <img
                        src={settings.socialSharingImageUrl}
                        alt="Social sharing"
                        className="w-full h-48 object-cover rounded-lg border border-gray-600"
                      />
                      <button
                        onClick={() => handleInputChange('socialSharingImageUrl', '')}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors bg-gray-700"
                    >
                      <FiImage className="mx-auto mb-2 text-gray-400" size={32} />
                      <p className="text-gray-400">
                        {uploading ? 'Uploading...' : 'Click to upload image'}
                      </p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Social Sharing Image URL:
                    </label>
                    <input
                      type="text"
                      value={settings.socialSharingImageUrl}
                      onChange={(e) => handleInputChange('socialSharingImageUrl', e.target.value)}
                      placeholder="https://pixabay.com/illustrations/background-texture-abstract"
                      className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* CODE INJECTION TAB */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            {/* Inside <head> code */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Inside &lt;head&gt; code:
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Paste any valid HTML code here. The code will be inserted to the end of &lt;head&gt; section, right before &lt;/head&gt;
              </p>
              <CodeMirror
                value={settings.headCode}
                height="150px"
                extensions={[html()]}
                onChange={(value) => handleInputChange('headCode', value)}
                className="border border-gray-600 rounded-lg overflow-hidden"
                theme="dark"
              />
            </div>

            {/* End of <body> code */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                End of &lt;body&gt; code:
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Paste any valid HTML code here. The code will be inserted to the end of &lt;body&gt; section, right before &lt;/body&gt; tag
              </p>
              <CodeMirror
                value={settings.bodyEndCode}
                height="150px"
                extensions={[html()]}
                onChange={(value) => handleInputChange('bodyEndCode', value)}
                className="border border-gray-600 rounded-lg overflow-hidden"
                theme="dark"
              />
            </div>

            {/* Before <!DOCTYPE> code */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Before &lt;!DOCTYPE&gt;, &lt;html&gt; and &lt;head&gt; tags:
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Paste the code you want to have in the VERY FIRST LINE of your page, before &lt;!DOCTYPE&gt;, &lt;html&gt; and &lt;head&gt; tags. Use for server side scripts (PHP, ASP, etc)
              </p>
              <CodeMirror
                value={settings.beforeDoctypeCode}
                height="150px"
                extensions={[javascript()]}
                onChange={(value) => handleInputChange('beforeDoctypeCode', value)}
                className="border border-gray-600 rounded-lg overflow-hidden"
                theme="dark"
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer with Save Button */}
      <div className="p-4 border-t border-gray-700 bg-gray-900">
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          Salvează Setările
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
