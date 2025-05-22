import { Button } from '@/components/ui/button';
import { DriveFile } from '@/types/drive';
import { getFileIcon, getFileIconColor, formatFileSize, formatDate } from '@/lib/fileUtils';
import { useFileOperations } from '@/hooks/useDriveFiles';
import { Download, Share, Star, StarOff, MoreVertical } from 'lucide-react';

interface FileListProps {
  files: DriveFile[];
  onPreview?: (file: DriveFile) => void;
}

export default function FileList({ files, onPreview }: FileListProps) {
  const { toggleStar, shareFile } = useFileOperations();

  const handleStarClick = (e: React.MouseEvent, file: DriveFile) => {
    e.stopPropagation();
    toggleStar({ fileId: file.id, starred: !file.starred });
  };

  const handleShareClick = (e: React.MouseEvent, file: DriveFile) => {
    e.stopPropagation();
    shareFile(file.id);
  };

  const handleDownloadClick = (e: React.MouseEvent, file: DriveFile) => {
    e.stopPropagation();
    if (file.webContentLink) {
      window.open(file.webContentLink, '_blank');
    }
  };

  const handleRowClick = (file: DriveFile) => {
    onPreview?.(file);
  };

  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <i className="fas fa-folder-open text-6xl"></i>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No files found</h3>
        <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {files.map((file) => {
        const iconColor = getFileIconColor(file.mimeType);
        return (
          <div
            key={file.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md hover:border-google-blue dark:hover:border-google-blue transition-all cursor-pointer"
            onClick={() => handleRowClick(file)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconColor}`}>
                  {file.mimeType.includes('image') && file.thumbnailLink ? (
                    <img
                      src={file.thumbnailLink.replace('=s220', '=s40')}
                      alt={file.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <i className={getFileIcon(file.mimeType)}></i>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{file.name}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Modified {formatDate(file.modifiedTime)}</span>
                    {file.size && <span>{formatFileSize(file.size)}</span>}
                    {file.owners?.[0] && <span>{file.owners[0].displayName}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  onClick={(e) => handleDownloadClick(e, file)}
                  title="Download"
                >
                  <Download size={16} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  onClick={(e) => handleShareClick(e, file)}
                  title="Share"
                >
                  <Share size={16} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className={`p-2 transition-colors ${
                    file.starred
                      ? 'text-yellow-400 hover:text-yellow-500'
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                  onClick={(e) => handleStarClick(e, file)}
                  title={file.starred ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {file.starred ? <Star size={16} fill="currentColor" /> : <StarOff size={16} />}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  title="More options"
                >
                  <MoreVertical size={16} />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
