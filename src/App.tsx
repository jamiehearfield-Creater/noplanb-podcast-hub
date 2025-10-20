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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/episodes" element={<Episodes />} />
                <Route path="/reels" element={<Reels />} />
                <Route path="/sponsors" element={<Sponsors />} />
                <Route path="/about" element={<About />} />
                <Route path="/subscribe" element={<Subscribe />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
