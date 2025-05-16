import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GamesPage from "./pages/GamesPage";
import StudioPage from "./pages/StudioPage";
import CommunityPage from "./pages/CommunityPage";
import CareersPage from "./pages/CareersPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import LoginPage from "./pages/Login";
import TicketsPage from "./pages/Tickets";
import Navbar from "@/components/Navbar"; 
import ProfilePage from "./pages/Profile";
import SettingsPage from "./pages/Settings";

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <BrowserRouter>
          <CustomCursor />
          <Navbar /> {/* ✅ Always present */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/studio" element={<StudioPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/tickets" element={<TicketsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
