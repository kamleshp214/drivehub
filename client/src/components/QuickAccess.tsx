import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useRecentFiles, useFavoriteFiles, useStorageQuota } from '@/hooks/useDriveFiles';
import { getFileIcon, getFileIconColor, formatDate, formatFileSize } from '@/lib/fileUtils';
import { Clock, Star, HardDrive } from 'lucide-react';

export default function QuickAccess() {
  const { data: recentFiles = [], isLoading: loadingRecent } = useRecentFiles();
  const { data: favoriteFiles = [], isLoading: loadingFavorites } = useFavoriteFiles();
  const { data: storageQuota } = useStorageQuota();

  const usagePercentage = storageQuota ? (storageQuota.usage / storageQuota.limit) * 100 : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Recent Files */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold">Recent Files</CardTitle>
          <Clock className="h-5 w-5 text-gray-400" />
        </CardHeader>
        <CardContent>
          {loadingRecent ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3 animate-pulse">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-1"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentFiles.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No recent files</p>
          ) : (
            <div className="space-y-3">
              {recentFiles.slice(0, 3).map((file) => {
                const iconColor = getFileIconColor(file.mimeType);
                return (
                  <div key={file.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconColor}`}>
                      <i className={`${getFileIcon(file.mimeType)} text-sm`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{file.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(file.modifiedTime)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Favorites */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold">Favorites</CardTitle>
          <Star className="h-5 w-5 text-yellow-400" />
        </CardHeader>
        <CardContent>
          {loadingFavorites ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3 animate-pulse">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-1"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : favoriteFiles.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No favorite files</p>
          ) : (
            <div className="space-y-3">
              {favoriteFiles.slice(0, 3).map((file) => {
                const iconColor = getFileIconColor(file.mimeType);
                return (
                  <div key={file.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconColor}`}>
                      <i className={`${getFileIcon(file.mimeType)} text-sm`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{file.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(file.modifiedTime)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Storage Info */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold">Storage</CardTitle>
          <HardDrive className="h-5 w-5 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">Used</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {storageQuota ? `${formatFileSize(storageQuota.usage.toString())} of ${formatFileSize(storageQuota.limit.toString())}` : 'Loading...'}
                </span>
              </div>
              <Progress value={usagePercentage} className="h-2" />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <div className="flex justify-between">
                <span>Documents</span>
                <span>--</span>
              </div>
              <div className="flex justify-between">
                <span>Images</span>
                <span>--</span>
              </div>
              <div className="flex justify-between">
                <span>Other</span>
                <span>--</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
