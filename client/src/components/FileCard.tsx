import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DriveFile } from '@/types/drive';
import { getFileIcon, getFileIconColor, formatFileSize, formatDate } from '@/lib/fileUtils';
import { useFileOperations } from '@/hooks/useDriveFiles';
import { Download, Share, Star, StarOff } from 'lucide-react';

interface FileCardProps {
  file: DriveFile;
  onPreview?: (file: DriveFile) => void;
}

export default function FileCard({ file, onPreview }: FileCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleStar, shareFile } = useFileOperations();
  const iconColor = getFileIconColor(file.mimeType);

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleStar({ fileId: file.id, starred: !file.starred });
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    shareFile(file.id);
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (file.webContentLink) {
      window.open(file.webContentLink, '_blank');
    }
  };

  const handleCardClick = () => {
    onPreview?.(file);
  };

  return (
    <div
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md hover:border-google-blue dark:hover:border-google-blue transition-all cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="flex flex-col items-center space-y-3">
        {/* File icon/thumbnail */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform ${iconColor}`}>
          {file.mimeType.includes('image') && file.thumbnailLink ? (
            <img
              src={file.thumbnailLink.replace('=s220', '=s96')}
              alt={file.name}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <i className={`${getFileIcon(file.mimeType)} text-lg`}></i>
          )}
        </div>

        {/* File name */}
        <div className="w-full text-center">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate" title={file.name}>
            {file.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {file.size ? formatFileSize(file.size) : formatDate(file.modifiedTime)}
          </p>
        </div>

        {/* Action buttons (hidden by default, shown on hover) */}
        <div className={`flex space-x-2 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Button
            size="sm"
            variant="ghost"
            className="p-1.5 h-auto text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            onClick={handleDownloadClick}
            title="Download"
          >
            <Download size={14} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="p-1.5 h-auto text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            onClick={handleShareClick}
            title="Share"
          >
            <Share size={14} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className={`p-1.5 h-auto transition-colors ${
              file.starred
                ? 'text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
            onClick={handleStarClick}
            title={file.starred ? 'Remove from favorites' : 'Add to favorites'}
          >
            {file.starred ? <Star size={14} fill="currentColor" /> : <StarOff size={14} />}
          </Button>
        </div>
      </div>
    </div>
  );
}
