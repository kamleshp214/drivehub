# DriveHub Setup Guide 🚀

Welcome to DriveHub! This guide will help you set up your Google Drive file management application in just a few minutes.

## What You'll Get ✨

- **Modern File Manager**: Beautiful, responsive interface for your Google Drive files
- **Dark Mode**: Toggle between light and dark themes
- **Multiple Views**: Grid and list views for your files
- **Smart Search**: Find files quickly with real-time search
- **File Preview**: View images, PDFs, and documents directly in the app
- **Drag & Drop Upload**: Easy file uploads with progress tracking
- **Quick Access**: See recent files and favorites at a glance

## Step 1: Get Your Google API Key 🔑

### A. Go to Google Cloud Console
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account

### B. Create a New Project (or select existing one)
1. Click the project dropdown at the top
2. Click "New Project"
3. Name it "DriveHub" (or any name you prefer)
4. Click "Create"

### C. Enable Google Drive API
1. In the left sidebar, go to "APIs & Services" → "Library"
2. Search for "Google Drive API"
3. Click on it and press "Enable"

### D. Create API Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy the API key that appears
4. **Important**: Click "Restrict Key" for security:
   - Under "API restrictions", select "Restrict key"
   - Choose "Google Drive API" from the list
   - Under "Website restrictions", add your domain:
     - For Replit: `*.replit.dev`
     - For local development: `http://localhost:*`
   - Click "Save"

## Step 2: Set Up Your API Key 🔧

### Option A: Using Replit Secrets (Recommended for Replit)
1. In your Replit project, click the "Tools" tab (lock icon) in the sidebar
2. Click "Secrets"
3. Add a new secret:
   - **Key**: `VITE_GOOGLE_API_KEY`
   - **Value**: Your Google API key from Step 1
4. Click "Add Secret"

### Option B: Using Environment File (For Local Development)
1. Create a `.env` file in your project root
2. Add this line:
   ```
   VITE_GOOGLE_API_KEY=your_api_key_here
   ```
3. Replace `your_api_key_here` with your actual API key

## Step 3: Enable Google Authentication 🔐

### A. Set up OAuth 2.0 (Required for file operations)
1. Back in Google Cloud Console, go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - Choose "External" user type
   - Fill in app name: "DriveHub"
   - Add your email as developer contact
   - Save and continue through the steps
4. For OAuth client ID:
   - Application type: "Web application"
   - Name: "DriveHub Client"
   - Authorized origins:
     - For Replit: `https://your-repl-name.your-username.repl.co`
     - For local: `http://localhost:5000`
   - Click "Create"
5. Copy the Client ID

### B. Add OAuth Client ID
Add another secret/environment variable:
- **Key**: `VITE_GOOGLE_CLIENT_ID`
- **Value**: Your OAuth Client ID

## Step 4: Update the App for Authentication 🔄

The app needs a small update to handle Google OAuth. I'll add this for you:

### Update main.tsx
Replace the Google API initialization with OAuth support:

```typescript
// In client/src/main.tsx
function initializeGoogleAPI() {
  return new Promise((resolve) => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
      }).then(() => {
        window.gapi.load('client', () => {
          window.gapi.client.init({
            apiKey: import.meta.env.VITE_GOOGLE_API_KEY || '',
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
          }).then(resolve);
        });
      });
    });
  });
}
```

## Step 5: Test Your Setup ✅

1. Restart your application
2. The app should load without errors
3. You'll see a Google sign-in prompt when you first use it
4. After signing in, you'll see your Google Drive files!

## Features Overview 🎯

### Navigation
- **Dashboard**: Overview with quick access sections
- **My Files**: All your Google Drive files
- **Recent**: Recently modified files
- **Favorites**: Your starred files

### File Operations
- **View**: Click any file to preview it
- **Download**: Click the download icon
- **Share**: Click share to create a shareable link
- **Star/Unstar**: Click the star icon to favorite files
- **Upload**: Use the floating + button or drag & drop files

### Search & Filter
- **Search**: Use the search bar to find files by name
- **Filters**: Filter by file type (All, Documents, Images, Folders)
- **Sort**: Sort by name, date modified, size, or starred status
- **View Modes**: Toggle between grid and list views

## Troubleshooting 🔧

### "Request is missing required authentication credential"
- Make sure you've set up OAuth 2.0 credentials
- Ensure the client ID is correctly added to your environment
- Check that you've signed in to Google when prompted

### "Method doesn't allow unregistered callers"
- Verify your API key is correctly set
- Make sure the Google Drive API is enabled in your project
- Check that your domain is added to API key restrictions

### Files not loading
- Sign out and sign back in to refresh your session
- Check browser console for specific error messages
- Ensure you have the necessary permissions for Google Drive

### CORS Errors
- Verify your domain is added to OAuth authorized origins
- For Replit, use the full domain format: `https://your-repl.your-username.repl.co`

## Security Best Practices 🔒

1. **Restrict Your API Key**: Always set domain restrictions
2. **Keep Secrets Safe**: Never commit API keys to code repositories
3. **Regular Review**: Periodically review your Google Cloud Console projects
4. **Minimal Permissions**: Only enable the APIs you actually use

## Support 💬

If you run into any issues:
1. Check the browser console for error messages
2. Verify all environment variables are set correctly
3. Ensure Google Drive API and OAuth are properly configured
4. Test with a fresh browser session

## What's Next? 🚀

Your DriveHub is now ready! You can:
- Organize your Google Drive files with ease
- Preview documents and images instantly
- Upload new files with drag & drop
- Share files with generated links
- Enjoy a modern, responsive file management experience

Happy file managing! 🎉