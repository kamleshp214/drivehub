import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Initialize Google API
declare global {
  interface Window {
    gapi: any;
  }
}

function initializeGoogleAPI() {
  return new Promise((resolve) => {
    try {
      if (window.gapi && import.meta.env.VITE_GOOGLE_CLIENT_ID) {
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
      } else {
        resolve(null);
      }
    } catch (error) {
      console.log('Google API initialization skipped - credentials not configured');
      resolve(null);
    }
  });
}

// Render the app immediately
createRoot(document.getElementById("root")!).render(<App />);

// Initialize Google API in background if available
if (window.gapi) {
  initializeGoogleAPI();
} else {
  window.addEventListener('load', () => {
    if (window.gapi) {
      initializeGoogleAPI();
    }
  });
}
