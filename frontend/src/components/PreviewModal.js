import React from 'react';
import { X } from 'lucide-react';
import { useBuilder } from '../context/BuilderContext';

const PreviewModal = () => {
  const { previewMode, setPreviewMode, currentPage, mobilePreview } = useBuilder();

  if (!previewMode) return null;

  // Render page blocks in preview mode
  const renderPreviewBlock = (block) => {
    switch (block.type) {
      case 'header':
        return (
          <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-4">
                {block.content?.title || 'Welcome to Our Website'}
              </h1>
              <p className="text-xl mb-8 opacity-90">
                {block.content?.subtitle || 'Build your dream website with ease'}
              </p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                {block.content?.buttonText || 'Get Started'}
              </button>
            </div>
          </header>
        );
      
      case 'text':
        return (
          <section className="py-16 px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                {block.content?.title || 'Your Heading Here'}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {block.content?.text || 'Add your compelling content here. This is a text block that can contain any information you want to share with your visitors.'}
              </p>
            </div>
          </section>
        );
      
      case 'features':
        const features = block.content?.features || [
          { title: 'Feature 1', description: 'Amazing feature description', icon: '⚡' },
          { title: 'Feature 2', description: 'Another great feature', icon: '🎯' },
          { title: 'Feature 3', description: 'Outstanding capability', icon: '🚀' }
        ];
        return (
          <section className="py-16 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                {block.content?.title || 'Our Features'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      
      case 'image':
        return (
          <section className="py-16 px-6">
            <div className="max-w-6xl mx-auto">
              <img 
                src={block.content?.imageUrl || 'https://via.placeholder.com/1200x600'} 
                alt={block.content?.alt || 'Image'}
                className="w-full rounded-lg shadow-lg"
              />
              {block.content?.caption && (
                <p className="text-center text-gray-600 mt-4">{block.content.caption}</p>
              )}
            </div>
          </section>
        );
      
      case 'footer':
        return (
          <footer className="bg-gray-900 text-white py-12 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    {block.content?.companyName || 'Company Name'}
                  </h3>
                  <p className="text-gray-400">
                    {block.content?.description || 'Your company description goes here.'}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white">About Us</a></li>
                    <li><a href="#" className="hover:text-white">Services</a></li>
                    <li><a href="#" className="hover:text-white">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Contact</h3>
                  <p className="text-gray-400">
                    {block.content?.contact || 'contact@example.com'}
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                <p>&copy; 2024 {block.content?.companyName || 'Your Company'}. All rights reserved.</p>
              </div>
            </div>
          </footer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-[100] flex flex-col">
      {/* Preview Header */}
      <div className="h-14 bg-gray-800 flex items-center justify-between px-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="text-white font-semibold">Preview Mode</div>
          <div className="text-gray-400 text-sm">
            {currentPage?.name || 'Page'} - {currentPage?.pageUrl || 'index.html'}
          </div>
        </div>
        <button
          onClick={() => setPreviewMode(false)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
        >
          <X size={18} />
          <span>Close Preview</span>
        </button>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto bg-white">
        <div className={`mx-auto transition-all ${mobilePreview ? 'max-w-sm' : 'w-full'}`}>
          {currentPage?.blocks && currentPage.blocks.length > 0 ? (
            currentPage.blocks.map((block) => (
              <div key={block.id}>
                {renderPreviewBlock(block)}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center text-gray-500">
                <p className="text-xl mb-2">No content yet</p>
                <p>Add blocks to your page to see them in preview</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
