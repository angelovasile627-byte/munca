import React from 'react';
import { BuilderProvider, useBuilder } from '../context/BuilderContext';
import Header from '../components/Header';
import PagesPanel from '../components/PagesPanel';
import SitesPanel from '../components/SitesPanel';
import Canvas from '../components/Canvas';
import BlocksPanel from '../components/BlocksPanel';
import FloatingButtons from '../components/FloatingButtons';
import SettingsPanel from '../components/SettingsPanel';
import { Home, Globe } from 'lucide-react';

const BuilderContent = () => {
  const { centerPanelView, setCenterPanelView, settingsPanelOpen, setSettingsPanelOpen } = useBuilder();

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-900">
      <Header />
      <div className="flex-1 flex mt-14 overflow-hidden">
        {/* Left Sidebar - Always visible */}
        <div className="w-16 bg-gray-900 border-r border-gray-700 flex flex-col items-center py-4 gap-4">
          <button
            onClick={() => setCenterPanelView(centerPanelView === 'pages' ? null : 'pages')}
            className={`w-12 h-12 flex items-center justify-center rounded-lg transition-colors ${
              centerPanelView === 'pages' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
            title="Pagini"
          >
            <Home className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setCenterPanelView(centerPanelView === 'sites' ? null : 'sites')}
            className={`w-12 h-12 flex items-center justify-center rounded-lg transition-colors ${
              centerPanelView === 'sites' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
            title="Site-uri"
          >
            <Globe className="w-5 h-5" />
          </button>

          <div className="flex-1" />

          <div className="text-xs text-gray-500 text-center px-1">
            <div className="font-medium">Free AI</div>
            <div className="text-[10px]">1 left</div>
          </div>
        </div>

        {/* Center Panel - Pages or Sites */}
        {centerPanelView === 'pages' && <PagesPanel />}
        {centerPanelView === 'sites' && <SitesPanel />}

        {/* Main Canvas Area */}
        <div className="flex-1 flex overflow-hidden">
          <Canvas />
          <BlocksPanel />
          <FloatingButtons />
        </div>

        {/* Right Settings Panel */}
        {settingsPanelOpen && (
          <div className="w-96">
            <SettingsPanel />
          </div>
        )}
      </div>
    </div>
  );
};

const Builder = () => {
  return (
    <BuilderProvider>
      <BuilderContent />
    </BuilderProvider>
  );
};

export default Builder;
