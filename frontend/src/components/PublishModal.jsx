import React from 'react';
import { X, Download, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const PublishModal = ({ isOpen, onClose, blocks, projectName }) => {
  if (!isOpen) return null;

  const generateFullHTML = () => {
    const htmlContent = blocks.map((block) => block.html).join('\n');
    const cssContent = blocks
      .filter((block) => block.css)
      .map((block) => block.css)
      .join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName || 'My Website'}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        }
        ${cssContent}
    </style>
</head>
<body>
${htmlContent}
</body>
</html>`;
  };

  const handleDownload = () => {
    const html = generateFullHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName || 'website'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    const html = generateFullHTML();
    navigator.clipboard.writeText(html);
    alert('HTML code copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gray-100 px-6 py-4 flex items-center justify-between border-b">
          <h2 className="text-xl font-semibold text-gray-800">Publish Website</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Export Options</h3>
            <div className="space-y-3">
              <Button
                onClick={handleDownload}
                className="w-full justify-start gap-3 bg-green-500 hover:bg-green-600 text-white"
              >
                <Download className="h-5 w-5" />
                Download HTML File
              </Button>
              <Button
                onClick={handleCopy}
                className="w-full justify-start gap-3 bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Download className="h-5 w-5" />
                Copy HTML Code
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">FTP Upload</h3>
            <div className="space-y-3">
              <Input placeholder="FTP Host" />
              <Input placeholder="Username" />
              <Input placeholder="Password" type="password" />
              <Input placeholder="Remote Path" />
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                <Upload className="h-5 w-5 mr-2" />
                Upload via FTP
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-4 flex justify-end gap-2 border-t">
          <Button onClick={onClose} variant="secondary">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublishModal;