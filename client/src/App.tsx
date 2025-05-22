import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import ApiSetupNotice from "@/components/ApiSetupNotice";
import Dashboard from "@/pages/Dashboard";

function Router() {
  // Check if API credentials are configured
  const hasApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const hasClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  
  if (!hasApiKey || !hasClientId) {
    return <ApiSetupNotice />;
  }

  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/files" component={Dashboard} />
      <Route path="/recent" component={Dashboard} />
      <Route path="/favorites" component={Dashboard} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-inter">
            <Router />
            <Toaster />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
