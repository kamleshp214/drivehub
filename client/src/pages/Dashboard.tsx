import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import QuickAccess from '@/components/QuickAccess';
import FileCard from '@/components/FileCard';
import FileList from '@/components/FileList';
import FloatingActionButton from '@/components/FloatingActionButton';
import FilePreviewModal from '@/components/FilePreviewModal';
import UploadModal from '@/components/UploadModal';
import { useDriveFiles } from '@/hooks/useDriveFiles';
import { DriveFile, SortOption, FilterOption, ViewMode } from '@/types/drive';
import { Grid, List, SortAsc, Filter } from 'lucide-react';

export default function Dashboard() {
  const [location] = useLocation();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('modifiedTime');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedFile, setSelectedFile] = useState<DriveFile | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Adjust filter based on route
  const routeFilter: FilterOption = 
    location === '/recent' ? 'all' :
    location === '/favorites' ? 'all' :
    filterBy;

  const { files, isLoading } = useDriveFiles({
    sortBy,
    filterBy: routeFilter,
    searchTerm,
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilePreview = (file: DriveFile) => {
    setSelectedFile(file);
    setShowPreviewModal(true);
  };

  const handleClosePreview = () => {
    setShowPreviewModal(false);
    setSelectedFile(null);
  };

  const handleUploadFiles = () => {
    setShowUploadModal(true);
  };

  const handleCreateFolder = () => {
    // TODO: Implement create folder functionality
    console.log('Create folder clicked');
  };

  const filterButtons = [
    { key: 'all', label: 'All Files', active: filterBy === 'all' },
    { key: 'documents', label: 'Documents', active: filterBy === 'documents' },
    { key: 'images', label: 'Images', active: filterBy === 'images' },
    { key: 'folders', label: 'Folders', active: filterBy === 'folders' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar onSearch={handleSearch} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Access Sections - only show on dashboard */}
        {location === '/' && <QuickAccess />}

        {/* Search and Filters Bar */}
        <div className="mb-8 space-y-4">
          {/* Filters and View Toggle */}
          <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
            <div className="flex flex-wrap gap-2">
              {filterButtons.map((button) => (
                <Button
                  key={button.key}
                  variant={button.active ? 'default' : 'outline'}
                  size="sm"
                  className={`${button.active ? 'bg-google-blue hover:bg-google-blue-dark' : ''} text-xs sm:text-sm`}
                  onClick={() => setFilterBy(button.key as FilterOption)}
                >
                  {button.label}
                </Button>
              ))}
            </div>

            <div className="flex items-center justify-between sm:justify-start space-x-3">
              {/* Sort Dropdown */}
              <div className="relative flex-1 sm:flex-none">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2 w-full sm:w-auto justify-center"
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                >
                  <SortAsc size={16} />
                  <span className="text-sm font-medium">Sort</span>
                </Button>
                {showSortDropdown && (
                  <div className="absolute left-0 right-0 sm:right-0 sm:left-auto mt-2 w-full sm:w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-50">
                    <div className="py-1">
                      {[
                        { value: 'name', label: 'Name' },
                        { value: 'modifiedTime', label: 'Date Modified' },
                        { value: 'size', label: 'Size' },
                        { value: 'starred', label: 'Starred' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          className="w-full text-left px-4 py-3 sm:py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => {
                            setSortBy(option.value as SortOption);
                            setShowSortDropdown(false);
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* View Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <Button
                  size="sm"
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 text-google-blue shadow-sm' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid view"
                >
                  <Grid size={16} />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  className={`p-2 ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 text-google-blue shadow-sm' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List view"
                >
                  <List size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* File Display */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4 animate-pulse">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                  <div className="w-full space-y-2">
                    <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-2 sm:h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {files.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                onPreview={handleFilePreview}
              />
            ))}
          </div>
        ) : (
          <FileList
            files={files}
            onPreview={handleFilePreview}
          />
        )}
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton
        onUploadFiles={handleUploadFiles}
        onCreateFolder={handleCreateFolder}
      />

      {/* Modals */}
      <FilePreviewModal
        file={selectedFile}
        open={showPreviewModal}
        onClose={handleClosePreview}
      />

      <UploadModal
        open={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />

      {/* Click outside to close sort dropdown */}
      {showSortDropdown && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowSortDropdown(false)}
        />
      )}
    </div>
  );
}
