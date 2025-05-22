import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, LogIn, LogOut, User } from 'lucide-react';

interface GoogleAuthProps {
  onAuthChange: (isAuthenticated: boolean) => void;
}

export default function GoogleAuth({ onAuthChange }: GoogleAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    if (window.gapi?.auth2) {
      const authInstance = window.gapi.auth2.getAuthInstance();
      if (authInstance) {
        const isSignedIn = authInstance.isSignedIn.get();
        setIsAuthenticated(isSignedIn);
        
        if (isSignedIn) {
          const user = authInstance.currentUser.get();
          const profile = user.getBasicProfile();
          setUserProfile({
            name: profile.getName(),
            email: profile.getEmail(),
            imageUrl: profile.getImageUrl(),
          });
        }
        
        onAuthChange(isSignedIn);
        setIsLoading(false);
      }
    }
  };

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      const authInstance = window.gapi.auth2.getAuthInstance();
      await authInstance.signIn({
        scope: 'https://www.googleapis.com/auth/drive'
      });
      checkAuthStatus();
    } catch (error) {
      console.error('Sign-in failed:', error);
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const authInstance = window.gapi.auth2.getAuthInstance();
      await authInstance.signOut();
      setIsAuthenticated(false);
      setUserProfile(null);
      onAuthChange(false);
    } catch (error) {
      console.error('Sign-out failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-google-blue rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Cloud className="text-white" size={24} />
          </div>
          <p className="text-gray-600 dark:text-gray-400">Loading DriveHub...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-google-blue rounded-xl flex items-center justify-center mx-auto mb-4">
              <Cloud className="text-white" size={32} />
            </div>
            <CardTitle className="text-2xl font-bold">Welcome to DriveHub</CardTitle>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Sign in with your Google account to access and manage your Google Drive files
            </p>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleSignIn}
              className="w-full bg-google-blue hover:bg-google-blue-dark flex items-center justify-center space-x-2"
              disabled={isLoading}
            >
              <LogIn size={18} />
              <span>Sign in with Google</span>
            </Button>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
              DriveHub will access your Google Drive files to provide file management features. 
              Your data remains secure and private.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      {userProfile && (
        <>
          <img
            src={userProfile.imageUrl}
            alt={userProfile.name}
            className="w-8 h-8 rounded-full"
          />
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {userProfile.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {userProfile.email}
            </p>
          </div>
        </>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSignOut}
        className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        title="Sign out"
      >
        <LogOut size={16} />
      </Button>
    </div>
  );
}