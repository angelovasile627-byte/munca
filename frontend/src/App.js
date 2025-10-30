import React, { useState, useEffect } from 'react';
import { Plus, Settings } from 'lucide-react';
import Header from './components/Header';
import Canvas from './components/Canvas';
import BlocksPanel from './components/BlocksPanel';
import SidebarMenu from './components/SidebarMenu';
import CodeViewModal from './components/CodeViewModal';
import PublishModal from './components/PublishModal';
import BlockEditorPanel from './components/BlockEditorPanel';
import { Button } from './components/ui/button';
import { themes, mockProjects } from './data/mockBlocks';
import { toast } from './hooks/use-toast';
import { Toaster } from './components/ui/sonner';
import './App.css';

function App() {
  const [blocks, setBlocks] = useState([]);
  const [isBlocksPanelOpen, setIsBlocksPanelOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('startm5');
  const [projects, setProjects] = useState(mockProjects);
  const [currentProject, setCurrentProject] = useState(null);
  const [selectedBlockForCode, setSelectedBlockForCode] = useState(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [selectedBlockForEdit, setSelectedBlockForEdit] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedBlocks = localStorage.getItem('mobirise_blocks');
    const savedTheme = localStorage.getItem('mobirise_theme');
    if (savedBlocks) {
      setBlocks(JSON.parse(savedBlocks));
    }
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Save to localStorage whenever blocks change
  useEffect(() => {
    if (blocks.length > 0) {
      localStorage.setItem('mobirise_blocks', JSON.stringify(blocks));
    }
  }, [blocks]);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('mobirise_theme', currentTheme);
  }, [currentTheme]);

  const handleAddBlock = (block) => {
    const newBlock = {
      ...block,
      instanceId: `${block.id}_${Date.now()}_${Math.random()}`
    };
    setBlocks([...blocks, newBlock]);
    setIsBlocksPanelOpen(false);
    setSelectedBlockForEdit(newBlock);
    toast({
      title: 'Block Added',
      description: `${block.name} has been added to your page.`
    });
  };

  const handleBlockDelete = (instanceId) => {
    setBlocks(blocks.filter((block) => block.instanceId !== instanceId));
    if (selectedBlockForEdit?.instanceId === instanceId) {
      setSelectedBlockForEdit(null);
    }
    toast({
      title: 'Block Deleted',
      description: 'Block has been removed from your page.'
    });
  };

  const handleBlockDuplicate = (block) => {
    const newBlock = {
      ...block,
      instanceId: `${block.id}_${Date.now()}_${Math.random()}`
    };
    const blockIndex = blocks.findIndex((b) => b.instanceId === block.instanceId);
    const newBlocks = [...blocks];
    newBlocks.splice(blockIndex + 1, 0, newBlock);
    setBlocks(newBlocks);
    toast({
      title: 'Block Duplicated',
      description: `${block.name} has been duplicated.`
    });
  };

  const handleReorderBlock = (dragIndex, dropIndex) => {
    const newBlocks = [...blocks];
    const [removed] = newBlocks.splice(dragIndex, 1);
    newBlocks.splice(dropIndex, 0, removed);
    setBlocks(newBlocks);
  };

  const handleBlockClick = (block) => {
    setSelectedBlockForEdit(block);
  };

  const handleSaveProject = () => {
    const projectName = prompt('Enter project name:', currentProject?.name || 'My Project');
    if (projectName) {
      const newProject = {
        id: currentProject?.id || Date.now().toString(),
        name: projectName,
        lastModified: new Date(),
        blocks: blocks
      };
      setCurrentProject(newProject);
      
      // Update or add to projects list
      const existingIndex = projects.findIndex((p) => p.id === newProject.id);
      if (existingIndex >= 0) {
        const newProjects = [...projects];
        newProjects[existingIndex] = newProject;
        setProjects(newProjects);
      } else {
        setProjects([newProject, ...projects]);
      }
      
      // Save to localStorage
      localStorage.setItem('mobirise_projects', JSON.stringify([newProject, ...projects]));
      
      toast({
        title: 'Project Saved',
        description: `${projectName} has been saved successfully.`
      });
    }
  };

  const handleLoadProject = (project) => {
    setCurrentProject(project);
    setBlocks(project.blocks || []);
    setIsSidebarOpen(false);
    toast({
      title: 'Project Loaded',
      description: `${project.name} has been loaded.`
    });
  };

  const handleNewProject = () => {
    if (blocks.length > 0) {
      const confirm = window.confirm('Create new project? Current work will be cleared.');
      if (!confirm) return;
    }
    setBlocks([]);
    setCurrentProject(null);
    setIsSidebarOpen(false);
    toast({
      title: 'New Project',
      description: 'Started a new project.'
    });
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header
        onMenuClick={() => setIsSidebarOpen(true)}
        onThemeChange={setCurrentTheme}
        currentTheme={currentTheme}
        themes={themes}
        onPublish={() => setIsPublishModalOpen(true)}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Canvas Area */}\n        <div className={`flex-1 transition-all duration-300 ${
          (isBlocksPanelOpen || selectedBlockForEdit) ? '' : ''
        }`}>
          <Canvas
            blocks={blocks}
            onBlockDelete={handleBlockDelete}
            onBlockDuplicate={handleBlockDuplicate}
            onShowCode={setSelectedBlockForCode}
            onReorderBlock={handleReorderBlock}
            onBlockClick={handleBlockClick}
            selectedBlock={selectedBlockForEdit}
          />
        </div>

        {/* Blocks Panel (Right Side) */}
        <BlocksPanel
          isOpen={isBlocksPanelOpen}
          onClose={() => setIsBlocksPanelOpen(false)}
          onAddBlock={handleAddBlock}
          currentTheme={currentTheme}
          themes={themes}
          onThemeChange={setCurrentTheme}
        />

        {/* Block Editor Panel (Right Side) */}
        <BlockEditorPanel
          isOpen={!!selectedBlockForEdit && !isBlocksPanelOpen}
          block={selectedBlockForEdit}
          onClose={() => setSelectedBlockForEdit(null)}
          onUpdate={(updatedBlock) => {
            const newBlocks = blocks.map((b) =>
              b.instanceId === updatedBlock.instanceId ? updatedBlock : b
            );
            setBlocks(newBlocks);
          }}
        />
      </div>

      {/* Fixed Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-30">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full bg-[#1ABC9C] hover:bg-[#16A085] shadow-lg"
          title="Settings"
        >
          <Settings className="h-6 w-6" />
        </Button>
        <Button
          size="icon"
          onClick={() => {
            setIsBlocksPanelOpen(!isBlocksPanelOpen);
            setSelectedBlockForEdit(null);
          }}
          className="h-16 w-16 rounded-full bg-[#FF3366] hover:bg-[#E62958] shadow-lg text-white text-3xl"
          title="Add Block"
        >
          <Plus className="h-8 w-8" />
        </Button>
      </div>

      {/* Modals */}
      <SidebarMenu
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        projects={projects}
        onProjectSelect={handleLoadProject}
        onSaveProject={handleSaveProject}
        onNewProject={handleNewProject}
      />

      <CodeViewModal
        isOpen={!!selectedBlockForCode}
        onClose={() => setSelectedBlockForCode(null)}
        block={selectedBlockForCode}
      />

      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        blocks={blocks}
        projectName={currentProject?.name}
      />

      <Toaster />
    </div>
  );
}

export default App;