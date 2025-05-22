# DriveHub 🚀

A modern, responsive Google Drive file manager built with React and TypeScript. Features dark mode, file preview, drag-and-drop uploads, and seamless mobile experience.

![DriveHub Preview](https://via.placeholder.com/800x400/1D4ED8/ffffff?text=DriveHub)

## ✨ Features

- 🎨 **Modern UI** - Clean, responsive design with dark/light mode
- 📱 **Mobile First** - Optimized for all screen sizes
- 🔍 **Smart Search** - Real-time file search and filtering
- 📁 **File Management** - Upload, preview, organize, and share files
- ⭐ **Favorites** - Star your important files for quick access
- 🎯 **Grid & List Views** - Multiple viewing options
- 🚀 **Fast Performance** - Built with modern React and Vite
- 🔒 **Secure** - Direct Google Drive API integration

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/drivehub)

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/drivehub.git
cd drivehub
npm install
```

### 2. Google Drive API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable the **Google Drive API**
4. Create credentials:
   - **API Key** (with domain restrictions)
   - **OAuth 2.0 Client ID** (for web application)

### 3. Environment Configuration

Copy `.env.example` to `.env` and fill in your credentials:

```env
VITE_GOOGLE_API_KEY=your_google_api_key_here
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id_here
```

### 4. Local Development

```bash
npm run dev
```

Visit `http://localhost:5000` to see your DriveHub!

## 📦 Deployment

### Vercel (Recommended)

1. **Fork this repository**
2. **Connect to Vercel**:
   - Import your GitHub repository to Vercel
   - Vercel will auto-detect it as a Vite project
3. **Set Environment Variables**:
   - Add `VITE_GOOGLE_API_KEY` and `VITE_GOOGLE_CLIENT_ID` in Vercel dashboard
4. **Deploy**: Vercel will automatically build and deploy

### Other Platforms

DriveHub works on any static hosting platform:
- Netlify
- GitHub Pages
- Firebase Hosting
- Surge.sh

Just run `npm run build` and upload the `dist` folder.

## 🔧 Configuration

### Google Cloud Console Setup

1. **Enable APIs**:
   - Google Drive API v3

2. **API Key Restrictions**:
   - Application restrictions: HTTP referrers
   - Add your domain: `https://yourdomain.com/*`

3. **OAuth 2.0 Setup**:
   - Application type: Web application
   - Authorized origins: `https://yourdomain.com`
   - Authorized redirect URIs: `https://yourdomain.com`

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GOOGLE_API_KEY` | Google API key for Drive access | ✅ |
| `VITE_GOOGLE_CLIENT_ID` | OAuth 2.0 client ID | ✅ |

## 🏗️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React + React Icons
- **State Management**: TanStack Query
- **Routing**: Wouter
- **API**: Google Drive API v3

## 📱 Mobile Support

DriveHub is fully responsive and optimized for:
- iPhone and Android phones
- Tablets and iPads
- Desktop computers
- Touch and mouse interactions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [troubleshooting guide](#troubleshooting)
2. Search existing [issues](https://github.com/yourusername/drivehub/issues)
3. Create a new issue with detailed information

## 🎯 Troubleshooting

### Common Issues

**"Setup Required" screen appears**
- Ensure environment variables are set correctly
- Check that your API key and client ID are valid

**Files not loading**
- Verify your Google Drive API is enabled
- Check domain restrictions on your API key
- Ensure OAuth consent screen is configured

**Mobile layout issues**
- Clear browser cache
- Check if JavaScript is enabled

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide](https://lucide.dev/) for the icon set
- [Vercel](https://vercel.com/) for seamless deployment

---

Built with ❤️ for better Google Drive management