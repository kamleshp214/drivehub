import { DriveFile, DriveFolder } from '@/types/drive';

declare global {
  interface Window {
    gapi: any;
  }
}

class DriveApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'DriveApiError';
  }
}

export class DriveAPI {
  private static instance: DriveAPI;
  
  static getInstance(): DriveAPI {
    if (!DriveAPI.instance) {
      DriveAPI.instance = new DriveAPI();
    }
    return DriveAPI.instance;
  }

  private async makeRequest(request: any): Promise<any> {
    try {
      const response = await request;
      return response.result;
    } catch (error: any) {
      console.error('Drive API Error:', error);
      throw new DriveApiError(
        error.result?.error?.message || 'Failed to access Google Drive',
        error.status
      );
    }
  }

  async listFiles(options: {
    query?: string;
    maxResults?: number;
    orderBy?: string;
    pageToken?: string;
  } = {}): Promise<{ files: DriveFile[]; nextPageToken?: string }> {
    const {
      query = "trashed=false",
      maxResults = 100,
      orderBy = 'modifiedTime desc',
      pageToken
    } = options;

    const request = window.gapi.client.drive.files.list({
      q: query,
      pageSize: maxResults,
      orderBy,
      pageToken,
      fields: 'nextPageToken, files(id, name, mimeType, size, modifiedTime, starred, webViewLink, webContentLink, thumbnailLink, parents, owners)'
    });

    const result = await this.makeRequest(request);
    return {
      files: result.files || [],
      nextPageToken: result.nextPageToken
    };
  }

  async searchFiles(searchTerm: string): Promise<DriveFile[]> {
    const query = `name contains '${searchTerm}' and trashed=false`;
    const result = await this.listFiles({ query });
    return result.files;
  }

  async getFavoriteFiles(): Promise<DriveFile[]> {
    const query = "starred=true and trashed=false";
    const result = await this.listFiles({ query });
    return result.files;
  }

  async getRecentFiles(limit: number = 10): Promise<DriveFile[]> {
    const result = await this.listFiles({ 
      maxResults: limit,
      orderBy: 'modifiedTime desc'
    });
    return result.files;
  }

  async getFilesByType(mimeTypePattern: string): Promise<DriveFile[]> {
    const query = `mimeType contains '${mimeTypePattern}' and trashed=false`;
    const result = await this.listFiles({ query });
    return result.files;
  }

  async getFile(fileId: string): Promise<DriveFile> {
    const request = window.gapi.client.drive.files.get({
      fileId,
      fields: 'id, name, mimeType, size, modifiedTime, starred, webViewLink, webContentLink, thumbnailLink, parents, owners'
    });

    return await this.makeRequest(request);
  }

  async updateFile(fileId: string, updates: Partial<DriveFile>): Promise<DriveFile> {
    const request = window.gapi.client.drive.files.update({
      fileId,
      resource: updates
    });

    return await this.makeRequest(request);
  }

  async toggleStar(fileId: string, starred: boolean): Promise<DriveFile> {
    return this.updateFile(fileId, { starred });
  }

  async deleteFile(fileId: string): Promise<void> {
    const request = window.gapi.client.drive.files.delete({
      fileId
    });

    await this.makeRequest(request);
  }

  async createShareLink(fileId: string): Promise<string> {
    // First, update the file to be shareable
    const permissionRequest = window.gapi.client.drive.permissions.create({
      fileId,
      resource: {
        role: 'reader',
        type: 'anyone'
      }
    });

    await this.makeRequest(permissionRequest);

    // Get the updated file with the share link
    const file = await this.getFile(fileId);
    return file.webViewLink || '';
  }

  async uploadFile(file: File, onProgress?: (progress: number) => void): Promise<DriveFile> {
    return new Promise((resolve, reject) => {
      const boundary = '-------314159265358979323846';
      const delimiter = "\r\n--" + boundary + "\r\n";
      const close_delim = "\r\n--" + boundary + "--";

      const metadata = {
        'name': file.name,
        'parents': ['root']
      };

      const multipartRequestBody =
        delimiter +
        'Content-Type: application/json\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        'Content-Type: ' + file.type + '\r\n\r\n';

      const request = new XMLHttpRequest();
      request.open('POST', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart');
      request.setRequestHeader('Authorization', 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token);
      request.setRequestHeader('Content-Type', 'multipart/related; boundary="' + boundary + '"');

      request.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) {
          const progress = (e.loaded / e.total) * 100;
          onProgress(progress);
        }
      });

      request.onload = () => {
        if (request.status === 200) {
          const result = JSON.parse(request.responseText);
          resolve(result);
        } else {
          reject(new DriveApiError('Upload failed', request.status));
        }
      };

      request.onerror = () => {
        reject(new DriveApiError('Upload failed'));
      };

      const reader = new FileReader();
      reader.onload = (e) => {
        const requestBody = multipartRequestBody + (e.target?.result as string) + close_delim;
        request.send(requestBody);
      };
      reader.readAsText(file);
    });
  }

  async createFolder(name: string, parentId: string = 'root'): Promise<DriveFolder> {
    const request = window.gapi.client.drive.files.create({
      resource: {
        name,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentId]
      }
    });

    return await this.makeRequest(request);
  }

  async getStorageQuota(): Promise<{ usage: number; limit: number }> {
    try {
      const request = window.gapi.client.drive.about.get({
        fields: 'storageQuota'
      });

      const result = await this.makeRequest(request);
      const quota = result.storageQuota;
      
      return {
        usage: parseInt(quota.usage || '0'),
        limit: parseInt(quota.limit || '15000000000') // Default 15GB
      };
    } catch (error) {
      console.error('Failed to get storage quota:', error);
      return { usage: 0, limit: 15000000000 };
    }
  }
}

export const driveApi = DriveAPI.getInstance();
