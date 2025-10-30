import React from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';

const CodeViewModal = ({ isOpen, onClose, block }) => {
  if (!isOpen || !block) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl max-h-[80vh] rounded-lg shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gray-100 px-6 py-4 flex items-center justify-between border-b">
          <h2 className="text-xl font-semibold text-gray-800">Block Code: {block.name}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {/* HTML */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">HTML</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{block.html}</code>
              </pre>
            </div>

            {/* CSS */}
            {block.css && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">CSS</h3>
                <pre className="bg-gray-900 text-blue-400 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{block.css}</code>
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-4 flex justify-end gap-2 border-t">
          <Button
            onClick={() => {
              navigator.clipboard.writeText(block.html + '\n\n' + (block.css || ''));
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Copy Code
          </Button>
          <Button onClick={onClose} variant="secondary">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodeViewModal;