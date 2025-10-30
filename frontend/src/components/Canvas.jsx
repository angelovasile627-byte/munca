import React from 'react';
import { Code, Copy, Trash2, GripVertical } from 'lucide-react';
import { Button } from './ui/button';

const Canvas = ({ blocks, onBlockDelete, onBlockDuplicate, onShowCode, onReorderBlock, onBlockClick, selectedBlock }) => {
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('blockIndex', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('blockIndex'));
    if (dragIndex !== dropIndex) {
      onReorderBlock(dragIndex, dropIndex);
    }
  };

  if (blocks.length === 0) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-gray-500 text-xl mb-2">This is a new empty page.</p>
          <p className="text-gray-400">Click the 'plus' ⊕ to add a new block.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto h-full">
      <div className="max-w-full">
        {blocks.map((block, index) => (
          <div
            key={block.instanceId}
            className={`relative group border-2 transition-all cursor-pointer ${
              selectedBlock?.instanceId === block.instanceId
                ? 'border-blue-500 bg-blue-50'
                : 'border-transparent hover:border-blue-300'
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onClick={() => onBlockClick(block)}
          >
            {/* Block Content */}
            <div dangerouslySetInnerHTML={{ __html: block.html }} />

            {/* Control Buttons */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 bg-white hover:bg-gray-100 shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  onShowCode(block);
                }}
                title="View Code"
              >
                <Code className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 bg-white hover:bg-gray-100 shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  onBlockDuplicate(block);
                }}
                title="Duplicate"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 bg-white hover:bg-gray-100 shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  onBlockDelete(block.instanceId);
                }}
                title="Delete"
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            </div>

            {/* Drag Handle */}
            <div className="absolute top-1/2 left-2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
              <div className="bg-white rounded shadow-lg p-1">
                <GripVertical className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Canvas;