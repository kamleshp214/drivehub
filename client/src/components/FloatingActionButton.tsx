import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Upload, FolderPlus } from 'lucide-react';

interface FloatingActionButtonProps {
  onUploadFiles?: () => void;
  onCreateFolder?: () => void;
}

export default function FloatingActionButton({ onUploadFiles, onCreateFolder }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="relative">
        {/* Upload Options Menu */}
        <div className={`absolute bottom-16 right-0 space-y-3 transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>
          <div className="flex items-center space-x-3">
            <span className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap">
              Upload Files
            </span>
            <Button
              className="w-12 h-12 bg-white dark:bg-gray-800 text-google-blue border-2 border-google-blue rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => {
                onUploadFiles?.();
                setIsOpen(false);
              }}
            >
              <Upload size={18} />
            </Button>
          </div>
          <div className="flex items-center space-x-3">
            <span className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap">
              Create Folder
            </span>
            <Button
              className="w-12 h-12 bg-white dark:bg-gray-800 text-google-blue border-2 border-google-blue rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => {
                onCreateFolder?.();
                setIsOpen(false);
              }}
            >
              <FolderPlus size={18} />
            </Button>
          </div>
        </div>

        {/* Main FAB */}
        <Button
          className="w-14 h-14 bg-google-blue hover:bg-google-blue-dark text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={toggleMenu}
        >
          <Plus 
            size={20} 
            className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`} 
          />
        </Button>
      </div>
    </div>
  );
}
