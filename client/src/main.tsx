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
    window.gapi.load('client', () => {
      window.gapi.client.init({
        apiKey: import.meta.env.VITE_GOOGLE_API_KEY || '',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
      }).then(resolve);
    });
  });
}

// Initialize Google API before rendering the app
if (window.gapi) {
  initializeGoogleAPI().then(() => {
    createRoot(document.getElementById("root")!).render(<App />);
  });
} else {
  // Fallback if GAPI is not loaded
  window.addEventListener('load', () => {
    if (window.gapi) {
      initializeGoogleAPI().then(() => {
        createRoot(document.getElementById("root")!).render(<App />);
      });
    } else {
      createRoot(document.getElementById("root")!).render(<App />);
    }
  });
}
