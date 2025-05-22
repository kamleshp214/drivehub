export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime: string;
  starred: boolean;
  webViewLink?: string;
  webContentLink?: string;
  thumbnailLink?: string;
  parents?: string[];
  owners?: Array<{
    displayName: string;
    emailAddress: string;
  }>;
}

export interface DriveFolder {
  id: string;
  name: string;
  modifiedTime: string;
  parents?: string[];
}

export interface FileUploadProgress {
  id: string;
  name: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

export type FileType = 'document' | 'image' | 'folder' | 'spreadsheet' | 'presentation' | 'pdf' | 'other';

export type SortOption = 'name' | 'modifiedTime' | 'size' | 'starred';
export type ViewMode = 'grid' | 'list';
export type FilterOption = 'all' | 'documents' | 'images' | 'folders';
