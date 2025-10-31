import React from 'react';
import { FiPlus, FiLink } from 'react-icons/fi';
import { useBuilder } from '../context/BuilderContext';

const FloatingButtons = () => {
  const { setBlocksPanelOpen, setSiteStylesPanelOpen } = useBuilder();

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-30">
      {/* Site Styles Button */}
      <button
        onClick={() => setSiteStylesPanelOpen(true)}
        className="w-14 h-14 bg-teal-500 hover:bg-teal-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-110"
        title="Site Styles"
      >
        <FiLink size={24} />
      </button>

      {/* Add Block Button */}
      <button
        onClick={() => setBlocksPanelOpen(true)}
        className="w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-110"
        title="Add Block"
      >
        <FiPlus size={28} />
      </button>
    </div>
  );
};

export default FloatingButtons;
