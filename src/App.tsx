import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Episodes from "./pages/Episodes";
import Reels from "./pages/Reels";
import Sponsors from "./pages/Sponsors";
import About from "./pages/About";
import Subscribe from "./pages/Subscribe";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AdminStats from "./pages/AdminStats";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminStats />} />
          <Route path="/" element={<Layout><Landing /></Layout>} />
          <Route path="/episodes" element={<Layout><Episodes /></Layout>} />
          <Route path="/reels" element={<Layout><Reels /></Layout>} />
          <Route path="/sponsors" element={<Layout><Sponsors /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/subscribe" element={<Layout><Subscribe /></Layout>} />
          <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
          <Route path="/cookies" element={<Layout><Cookies /></Layout>} />
          <Route path="/terms" element={<Layout><Terms /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
