import React from 'react';
import { FiX } from 'react-icons/fi';
import { useBuilder } from '../context/BuilderContext';

const SettingsPanel = () => {
  const { settingsPanelOpen, setSettingsPanelOpen, currentPage } = useBuilder();

  return (
    <>
      {/* Overlay */}
      {settingsPanelOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSettingsPanelOpen(false)}
        />
      )}

      {/* Settings Panel */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transition-transform duration-300 ${
        settingsPanelOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-slate-700 text-white">
          <h2 className="text-lg font-bold">Page Settings</h2>
          <button
            onClick={() => setSettingsPanelOpen(false)}
            className="p-2 hover:bg-slate-600 rounded transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Settings Content */}
        <div className="p-6 overflow-y-auto h-[calc(100%-64px)]">
          <div className="space-y-6">
            {/* Page Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Page Title:
              </label>
              <input
                type="text"
                defaultValue={currentPage.name}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Page Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Page Description:
              </label>
              <textarea
                rows={3}
                placeholder="Enter page description..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Page URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Page URL:
              </label>
              <input
                type="text"
                placeholder="/page-url"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                This is the default site page. Don't rename it unless you have another index.html file.
              </p>
            </div>

            {/* Google Preview */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Google Preview:
              </label>
              <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <div className="flex gap-2 mb-3">
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">Desktop</button>
                  <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded">Mobile</button>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="text-blue-600 text-sm mb-1">{currentPage.name}</div>
                  <div className="text-gray-500 text-xs">https://yoursite.com/</div>
                  <div className="text-gray-600 text-sm mt-2">Your page description will appear here...</div>
                </div>
              </div>
            </div>

            {/* Social Sharing */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Social Sharing Image:
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-500">Click to upload image</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPanel;
