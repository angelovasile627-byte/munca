import React from 'react';
import { BuilderProvider } from '../context/BuilderContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Canvas from '../components/Canvas';
import BlocksPanel from '../components/BlocksPanel';
import FloatingButtons from '../components/FloatingButtons';
import SettingsPanel from '../components/SettingsPanel';

const Builder = () => {
  return (
    <BuilderProvider>
      <div className="h-screen flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 flex mt-14 overflow-hidden">
          <Sidebar />
          <Canvas />
          <BlocksPanel />
          <SettingsPanel />
          <FloatingButtons />
        </div>
      </div>
    </BuilderProvider>
  );
};

export default Builder;
