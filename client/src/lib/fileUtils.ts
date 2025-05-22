import { DriveFile, FileType } from '@/types/drive';

export function getFileIcon(mimeType: string): string {
  if (mimeType.includes('folder')) return 'fas fa-folder';
  if (mimeType.includes('pdf')) return 'fas fa-file-pdf';
  if (mimeType.includes('word') || mimeType.includes('document')) return 'fas fa-file-word';
  if (mimeType.includes('sheet') || mimeType.includes('excel')) return 'fas fa-file-excel';
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'fas fa-file-powerpoint';
  if (mimeType.includes('image')) return 'fas fa-file-image';
  if (mimeType.includes('video')) return 'fas fa-file-video';
  if (mimeType.includes('audio')) return 'fas fa-file-audio';
  if (mimeType.includes('text')) return 'fas fa-file-alt';
  return 'fas fa-file';
}

export function getFileIconColor(mimeType: string): string {
  if (mimeType.includes('folder')) return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900';
  if (mimeType.includes('pdf')) return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900';
  if (mimeType.includes('word') || mimeType.includes('document')) return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900';
  if (mimeType.includes('sheet') || mimeType.includes('excel')) return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900';
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900';
  if (mimeType.includes('image')) return 'text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-900';
  if (mimeType.includes('video')) return 'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900';
  if (mimeType.includes('audio')) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900';
  return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900';
}

export function getFileType(mimeType: string): FileType {
  if (mimeType.includes('folder')) return 'folder';
  if (mimeType.includes('pdf')) return 'pdf';
  if (mimeType.includes('word') || mimeType.includes('document')) return 'document';
  if (mimeType.includes('sheet') || mimeType.includes('excel')) return 'spreadsheet';
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'presentation';
  if (mimeType.includes('image')) return 'image';
  return 'other';
}

export function formatFileSize(bytes?: string): string {
  if (!bytes) return '';
  const size = parseInt(bytes);
  if (size === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return parseFloat((size / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours === 0) {
      const minutes = Math.floor(diff / (1000 * 60));
      return minutes <= 1 ? 'Just now' : `${minutes} minutes ago`;
    }
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  } else if (days === 1) {
    return 'Yesterday';
  } else if (days < 7) {
    return `${days} days ago`;
  } else {
    return date.toLocaleDateString();
  }
}

export function getPreviewUrl(file: DriveFile): string | null {
  if (file.mimeType.includes('image') && file.thumbnailLink) {
    return file.thumbnailLink.replace('=s220', '=s400');
  }
  
  if (file.mimeType.includes('pdf') || 
      file.mimeType.includes('document') || 
      file.mimeType.includes('presentation') ||
      file.mimeType.includes('sheet')) {
    return `https://docs.google.com/gview?url=${encodeURIComponent(file.webContentLink || '')}&embedded=true`;
  }
  
  return null;
}

export function canPreview(mimeType: string): boolean {
  return mimeType.includes('image') || 
         mimeType.includes('pdf') || 
         mimeType.includes('document') || 
         mimeType.includes('presentation') ||
         mimeType.includes('sheet');
}
