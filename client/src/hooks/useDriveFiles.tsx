import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { driveApi } from '@/lib/driveApi';
import { DriveFile, SortOption, FilterOption } from '@/types/drive';
import { useToast } from '@/hooks/use-toast';

export function useDriveFiles(options: {
  sortBy?: SortOption;
  filterBy?: FilterOption;
  searchTerm?: string;
} = {}) {
  const { sortBy = 'modifiedTime', filterBy = 'all', searchTerm = '' } = options;
  const { toast } = useToast();

  const queryKey = ['driveFiles', sortBy, filterBy, searchTerm];

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      if (searchTerm) {
        return driveApi.searchFiles(searchTerm);
      }

      let mimeTypeQuery = '';
      switch (filterBy) {
        case 'documents':
          mimeTypeQuery = 'application/vnd.google-apps.document or application/pdf or application/msword';
          break;
        case 'images':
          mimeTypeQuery = 'image/';
          break;
        case 'folders':
          mimeTypeQuery = 'application/vnd.google-apps.folder';
          break;
      }

      const query = mimeTypeQuery ? `(${mimeTypeQuery}) and trashed=false` : 'trashed=false';
      const orderBy = sortBy === 'modifiedTime' ? 'modifiedTime desc' : 
                     sortBy === 'name' ? 'name' :
                     sortBy === 'size' ? 'quotaBytesUsed desc' : 'starred desc, modifiedTime desc';

      const result = await driveApi.listFiles({ query, orderBy });
      return result.files;
    },
    enabled: !!window.gapi?.client?.drive,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    files: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useRecentFiles() {
  return useQuery({
    queryKey: ['recentFiles'],
    queryFn: () => driveApi.getRecentFiles(5),
    enabled: !!window.gapi?.client?.drive,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useFavoriteFiles() {
  return useQuery({
    queryKey: ['favoriteFiles'],
    queryFn: () => driveApi.getFavoriteFiles(),
    enabled: !!window.gapi?.client?.drive,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useStorageQuota() {
  return useQuery({
    queryKey: ['storageQuota'],
    queryFn: () => driveApi.getStorageQuota(),
    enabled: !!window.gapi?.client?.drive,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useFileOperations() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const toggleStarMutation = useMutation({
    mutationFn: ({ fileId, starred }: { fileId: string; starred: boolean }) =>
      driveApi.toggleStar(fileId, starred),
    onSuccess: (_, { starred }) => {
      queryClient.invalidateQueries({ queryKey: ['driveFiles'] });
      queryClient.invalidateQueries({ queryKey: ['favoriteFiles'] });
      toast({
        title: starred ? 'Added to favorites' : 'Removed from favorites',
        description: 'File has been updated successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update file. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (fileId: string) => driveApi.deleteFile(fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['driveFiles'] });
      queryClient.invalidateQueries({ queryKey: ['recentFiles'] });
      queryClient.invalidateQueries({ queryKey: ['favoriteFiles'] });
      toast({
        title: 'File deleted',
        description: 'File has been moved to trash.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete file. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const shareFileMutation = useMutation({
    mutationFn: (fileId: string) => driveApi.createShareLink(fileId),
    onSuccess: (shareLink) => {
      navigator.clipboard.writeText(shareLink);
      toast({
        title: 'Share link copied',
        description: 'The share link has been copied to your clipboard.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to create share link. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const uploadMutation = useMutation({
    mutationFn: ({ file, onProgress }: { file: File; onProgress?: (progress: number) => void }) =>
      driveApi.uploadFile(file, onProgress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['driveFiles'] });
      toast({
        title: 'Upload complete',
        description: 'File has been uploaded successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Upload failed',
        description: 'Failed to upload file. Please try again.',
        variant: 'destructive',
      });
    },
  });

  return {
    toggleStar: toggleStarMutation.mutate,
    deleteFile: deleteMutation.mutate,
    shareFile: shareFileMutation.mutate,
    uploadFile: uploadMutation.mutate,
    isLoading: toggleStarMutation.isPending || deleteMutation.isPending || 
               shareFileMutation.isPending || uploadMutation.isPending,
  };
}
