import React from 'react';
import { X, FileText, Settings, Palette, Upload, User, Save } from 'lucide-react';
import { Button } from './ui/button';

const SidebarMenu = ({ isOpen, onClose, projects, onProjectSelect, onSaveProject, onNewProject }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-gray-100 px-6 py-4 flex items-center justify-between border-b">
          <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Project Management */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Projects</h3>
            <div className="space-y-2">
              <Button
                onClick={onNewProject}
                className="w-full justify-start gap-3 bg-blue-500 hover:bg-blue-600 text-white"
              >
                <FileText className="h-4 w-4" />
                New Project
              </Button>
              <Button
                onClick={onSaveProject}
                className="w-full justify-start gap-3 bg-green-500 hover:bg-green-600 text-white"
              >
                <Save className="h-4 w-4" />
                Save Project
              </Button>
            </div>
          </div>

          {/* Recent Projects */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Recent Projects</h3>
            <div className="space-y-2">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => onProjectSelect(project)}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors border"
                >
                  <p className="font-medium text-gray-800">{project.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Last modified: {project.lastModified.toLocaleDateString()}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Settings</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700">
                <Settings className="h-4 w-4" />
                Site Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700">
                <Palette className="h-4 w-4" />
                Site Styles
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700">
                <Upload className="h-4 w-4" />
                FTP Upload
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700">
                <User className="h-4 w-4" />
                User Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;