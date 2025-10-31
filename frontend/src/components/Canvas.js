import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useBuilder } from '../context/BuilderContext';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

const Canvas = () => {
  const { 
    currentPage, 
    mobilePreview, 
    reorderBlocks, 
    removeBlock,
    setBlocksPanelOpen,
    blocksPanelOpen
  } = useBuilder();

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    reorderBlocks(result.source.index, result.destination.index);
  };

  // Handler pentru click în canvas - închide BlocksPanel
  const handleCanvasClick = (e) => {
    // Verifică dacă click-ul este în canvas, nu pe butoane de control
    if (blocksPanelOpen && e.target.closest('.canvas-container')) {
      setBlocksPanelOpen(false);
    }
  };

  const canvasWidth = mobilePreview ? 'max-w-sm' : 'max-w-7xl';

  return (
    <div 
      className={`flex-1 bg-gray-100 overflow-auto p-8 transition-all duration-300 ${blocksPanelOpen ? 'mr-80' : 'mr-0'}`}
      onClick={handleCanvasClick}
    >
      <div className={`mx-auto bg-white shadow-lg min-h-[800px] ${canvasWidth} transition-all duration-300`}>
        {currentPage.blocks.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center h-[800px] text-center">
            <p className="text-gray-500 text-lg mb-2">This is a new empty page.</p>
            <p className="text-gray-500 text-lg mb-4">Click the "plus"</p>
            <button
              onClick={() => setBlocksPanelOpen(true)}
              className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors shadow-lg"
            >
              <FiPlus size={32} />
            </button>
            <p className="text-gray-500 text-lg mt-4">to add a new block.</p>
          </div>
        ) : (
          // Blocks List
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="canvas">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-[800px] ${snapshot.isDraggingOver ? 'bg-blue-50' : ''}`}
                >
                  {currentPage.blocks.map((block, index) => (
                    <Draggable key={block.id} draggableId={block.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`relative group border-2 border-transparent hover:border-blue-400 transition-all ${
                            snapshot.isDragging ? 'shadow-2xl' : ''
                          }`}
                        >
                          {/* Drag Handle - Top Right */}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <button
                              {...provided.dragHandleProps}
                              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                              title="Drag to reorder"
                            >
                              <FiEdit2 size={16} />
                            </button>
                          </div>

                          {/* Delete Button - Bottom Right (Large and Visible) */}
                          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <button
                              onClick={() => removeBlock(block.id)}
                              className="w-12 h-12 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center justify-center shadow-lg"
                              title="Delete block"
                              aria-label="Delete block"
                            >
                              <FiTrash2 size={20} />
                            </button>
                          </div>

                          {/* Block Content */}
                          <BlockRenderer block={block} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
};

// Block Renderer Component
const BlockRenderer = ({ block }) => {
  switch (block.type) {
    case 'header':
      return (
        <div className="canvas-block bg-gradient-to-r from-blue-600 to-purple-600 text-white p-20 text-center">
          <h1 className="text-5xl font-bold mb-4">{block.content.title || 'Your Title Here'}</h1>
          <p className="text-xl mb-8">{block.content.subtitle || 'Your subtitle here'}</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            {block.content.buttonText || 'Get Started'}
          </button>
        </div>
      );
    
    case 'text':
      return (
        <div className="canvas-block p-12">
          <h2 className="text-3xl font-bold mb-4">{block.content.heading || 'Heading'}</h2>
          <p className="text-lg text-gray-700">{block.content.text || 'Your text content here. Click to edit.'}</p>
        </div>
      );
    
    case 'features':
      return (
        <div className="canvas-block p-12 bg-gray-50">
          <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                  ✨
                </div>
                <h3 className="text-xl font-bold mb-2">Feature {i}</h3>
                <p className="text-gray-600">Description of feature {i}</p>
              </div>
            ))}
          </div>
        </div>
      );
    
    case 'image':
      return (
        <div className="canvas-block p-8">
          <img 
            src={block.content.src || 'https://via.placeholder.com/1200x600'} 
            alt={block.content.alt || 'Image'}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      );
    
    case 'footer':
      return (
        <div className="canvas-block bg-slate-800 text-white p-12">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Services</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Blog</li>
                <li>Help</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Social</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Cookie</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-400 border-t border-gray-700 pt-8">
            © 2025 Your Company. All rights reserved.
          </div>
        </div>
      );
    
    default:
      return (
        <div className="canvas-block p-8 bg-gray-100">
          <p>Unknown block type: {block.type}</p>
        </div>
      );
  }
};

export default Canvas;
