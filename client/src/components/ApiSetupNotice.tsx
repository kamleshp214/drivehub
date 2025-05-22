import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Key, ExternalLink, Copy } from 'lucide-react';
import { useState } from 'react';

export default function ApiSetupNotice() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Key className="text-blue-600 dark:text-blue-400" size={32} />
          </div>
          <CardTitle className="text-2xl font-bold">Setup Required</CardTitle>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            To use DriveHub, you'll need to configure your Google Drive API credentials
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="text-yellow-600 dark:text-yellow-400 mt-0.5" size={20} />
              <div>
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200">API Configuration Needed</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  DriveHub requires Google Drive API credentials to function. Follow the setup guide to get started.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Quick Setup Steps:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>Go to <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Google Cloud Console</a></li>
              <li>Create a new project or select an existing one</li>
              <li>Enable the Google Drive API</li>
              <li>Create credentials (API Key and OAuth 2.0 Client ID)</li>
              <li>Add your domain to authorized origins</li>
              <li>Set environment variables in Vercel</li>
            </ol>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Environment Variables:</h4>
            <div className="space-y-2 text-sm font-mono">
              <div className="flex items-center justify-between bg-white dark:bg-gray-700 p-2 rounded border">
                <span className="text-gray-600 dark:text-gray-400">VITE_GOOGLE_API_KEY</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard('VITE_GOOGLE_API_KEY')}
                  className="h-6 px-2"
                >
                  <Copy size={12} />
                </Button>
              </div>
              <div className="flex items-center justify-between bg-white dark:bg-gray-700 p-2 rounded border">
                <span className="text-gray-600 dark:text-gray-400">VITE_GOOGLE_CLIENT_ID</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard('VITE_GOOGLE_CLIENT_ID')}
                  className="h-6 px-2"
                >
                  <Copy size={12} />
                </Button>
              </div>
            </div>
            {copied && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">Copied to clipboard!</p>
            )}
          </div>

          <div className="flex space-x-3">
            <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700">
              <a
                href="https://console.cloud.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <ExternalLink size={16} className="mr-2" />
                Google Cloud Console
              </a>
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="flex-1"
            >
              Check Again
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Once configured, DriveHub will automatically connect to your Google Drive
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}