# 🚀 DriveHub - Google Drive File Manager

A beautiful, modern file manager for Google Drive that works perfectly on mobile and desktop. Upload, organize, and preview your files with ease!

![DriveHub Preview](https://via.placeholder.com/800x400/1D4ED8/ffffff?text=DriveHub)

## ✨ What Can You Do?

- 📱 **Mobile Perfect** - Works amazing on phones, tablets, and computers
- 🎨 **Beautiful Design** - Dark/light mode toggle
- 📁 **Manage Files** - Upload, download, organize, star favorites
- 🔍 **Smart Search** - Find files instantly
- 👀 **Preview Files** - View images, documents without downloading
- 🔒 **100% Secure** - Direct connection to YOUR Google Drive

---

# 🎯 How to Deploy Your Own DriveHub (Super Easy!)

## Step 1: Get the Code (2 minutes)

### Option A: Download ZIP
1. Click the green **"Code"** button above
2. Click **"Download ZIP"**
3. Extract the folder to your computer

### Option B: Fork on GitHub
1. Click **"Fork"** button (top right)
2. Now you have your own copy!

---

## Step 2: Deploy to Vercel (1 minute)

### The Easy Way:
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub (free account)
3. Click **"New Project"**
4. Import your DriveHub repository
5. Click **"Deploy"** 

**That's it!** Your site is live (but needs Google setup next).

---

## Step 3: Get Google API Keys (5 minutes)

Don't worry - this sounds scary but it's actually simple! 

### 3.1: Create Google Project
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Sign in with your Google account
3. Click **"Select a project"** → **"New Project"**
4. Name it "DriveHub" → Click **"Create"**

### 3.2: Enable Google Drive API
1. In the search bar, type **"Google Drive API"**
2. Click on it → Click **"Enable"**
3. Wait 30 seconds for it to activate

### 3.3: Create API Key
1. Click **"Credentials"** (left sidebar)
2. Click **"+ Create Credentials"** → **"API Key"**
3. **Copy this key somewhere safe!** (You'll need it in Step 4)

### 3.4: Create OAuth Client
1. Still in Credentials, click **"+ Create Credentials"** → **"OAuth client ID"**
2. If asked, click **"Configure consent screen"**:
   - Choose **"External"** → **"Create"**
   - App name: "DriveHub"
   - User support email: Your email
   - Developer email: Your email
   - Click **"Save and Continue"** through all steps
3. Back to Credentials → **"+ Create Credentials"** → **"OAuth client ID"**
4. Application type: **"Web application"**
5. Name: "DriveHub"
6. Authorized origins: `https://your-vercel-domain.vercel.app` (get this from Vercel)
7. Click **"Create"**
8. **Copy the Client ID!** (You'll need it in Step 4)

---

## Step 4: Add Keys to Vercel (1 minute)

1. Go to your Vercel dashboard
2. Click on your DriveHub project
3. Click **"Settings"** → **"Environment Variables"**
4. Add these two variables:

```
Name: VITE_GOOGLE_API_KEY
Value: [paste your API key from Step 3.3]

Name: VITE_GOOGLE_CLIENT_ID  
Value: [paste your Client ID from Step 3.4]
```

5. Click **"Save"**
6. Go to **"Deployments"** → **"Redeploy"**

---

## Step 5: Secure Your API Key (2 minutes)

1. Back in Google Cloud Console → **"Credentials"**
2. Click the pencil icon next to your API key
3. Under **"Application restrictions"**:
   - Select **"HTTP referrers"**
   - Add: `https://your-vercel-domain.vercel.app/*`
4. Click **"Save"**

---

# 🎉 You're Done!

Visit your Vercel URL and enjoy your personal DriveHub! 

## 🔧 What You Get

### On Mobile 📱
- Perfect touch interface
- Swipe gestures
- Responsive design
- Upload photos from camera

### On Desktop 💻  
- Drag & drop uploads
- Keyboard shortcuts
- Grid and list views
- File previews

### Always Secure 🔒
- Your files stay in YOUR Google Drive
- No files stored on our servers
- Direct Google API connection

---

# 🆘 Need Help?

## Common Issues & Solutions

### ❌ "Setup Required" Screen Appears
**Problem:** API keys not configured
**Solution:** 
- Check Vercel environment variables are set correctly
- Make sure you redeployed after adding variables
- Copy/paste keys carefully (no extra spaces)

### ❌ "Sign in failed" Error  
**Problem:** OAuth not configured properly
**Solution:**
- Make sure your Vercel domain is in OAuth authorized origins
- Check that consent screen is published
- Try in incognito mode

### ❌ Files Don't Load
**Problem:** API restrictions too strict
**Solution:**
- Add your domain to API key restrictions
- Enable Google Drive API
- Check quota limits in Google Console

### ❌ Mobile Layout Broken
**Problem:** Cache or JavaScript issues
**Solution:**
- Clear browser cache
- Enable JavaScript
- Try different browser

## 💡 Pro Tips

### For Better Performance:
- Use Vercel's custom domain feature
- Enable Vercel Analytics
- Monitor usage in Google Console

### For Security:
- Regularly check API usage
- Set up usage alerts
- Keep credentials private

### For Development:
- Test locally with `npm run dev`
- Use Chrome DevTools for mobile testing
- Check browser console for errors

---

# 🛠️ Technical Details

## What's Inside?
- **React 18** - Modern frontend framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Beautiful styling
- **Vite** - Super fast builds
- **Google Drive API** - File management
- **Responsive Design** - Works everywhere

## File Structure
```
drivehub/
├── client/src/          # React app
├── components/          # UI components  
├── pages/              # App pages
├── hooks/              # Custom logic
└── lib/                # Utilities
```

## Browser Support
- ✅ Chrome/Edge (latest)
- ✅ Safari (latest) 
- ✅ Firefox (latest)
- ✅ Mobile browsers
- ✅ iOS Safari
- ✅ Android Chrome

---

# 🌟 Want to Contribute?

1. Fork the repository
2. Create a feature branch: `git checkout -b my-new-feature`
3. Make your changes
4. Test on mobile and desktop
5. Submit a pull request

## Ideas for Contributions:
- 🎨 New themes/colors
- 📱 Better mobile gestures  
- 🔍 Advanced search filters
- 📊 Usage analytics
- 🌍 Multiple languages
- ⚡ Performance optimizations

---

# 📄 License

MIT License - feel free to use for personal or commercial projects!

---

# 🙏 Credits

Built with amazing open source tools:
- [React](https://react.dev/) - UI framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Vercel](https://vercel.com/) - Deployment platform
- [Google Drive API](https://developers.google.com/drive) - File management

---

**Enjoy your new DriveHub! 🚀**

*Questions? Open an issue or discussion - I'm here to help!*