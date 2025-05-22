import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DriveFile } from '@/types/drive';
import { getFileIcon, getFileIconColor, formatFileSize, formatDate, getPreviewUrl, canPreview } from '@/lib/fileUtils';
import { useFileOperations } from '@/hooks/useDriveFiles';
import { Download, Share, X } from 'lucide-react';

interface FilePreviewModalProps {
  file: DriveFile | null;
  open: boolean;
  onClose: () => void;
}

export default function FilePreviewModal({ file, open, onClose }: FilePreviewModalProps) {
  const { shareFile } = useFileOperations();

  if (!file) return null;

  const iconColor = getFileIconColor(file.mimeType);
  const previewUrl = getPreviewUrl(file);
  const canPreviewFile = canPreview(file.mimeType);

  const handleDownload = () => {
    if (file.webContentLink) {
      window.open(file.webContentLink, '_blank');
    }
  };

  const handleShare = () => {
    shareFile(file.id);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconColor}`}>
              <i className={getFileIcon(file.mimeType)}></i>
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">{file.name}</DialogTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {file.size ? formatFileSize(file.size) : ''} • Modified {formatDate(file.modifiedTime)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              title="Download"
            >
              <Download size={18} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              title="Share"
            >
              <Share size={18} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              title="Close"
            >
              <X size={18} />
            </Button>
          </div>
        </DialogHeader>

        <div className="overflow-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
          {canPreviewFile && previewUrl ? (
            <div className="w-full h-full min-h-[400px]">
              {file.mimeType.includes('image') ? (
                <img
                  src={previewUrl}
                  alt={file.name}
                  className="w-full h-auto max-h-[600px] object-contain rounded-lg"
                />
              ) : (
                <iframe
                  src={previewUrl}
                  className="w-full h-[600px] border-0 rounded-lg"
                  title={file.name}
                />
              )}
            </div>
          ) : (
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${iconColor}`}>
                <i className={`${getFileIcon(file.mimeType)} text-2xl`}></i>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Preview not available for this file type</p>
              <Button onClick={handleDownload} className="bg-google-blue hover:bg-google-blue-dark">
                <Download size={18} className="mr-2" />
                Download File
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
