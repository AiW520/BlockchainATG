import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import BlockchainBasics from "@/pages/BlockchainBasics";
import ProgrammingLanguages from "@/pages/ProgrammingLanguages";
import CompetitionChannels from "@/pages/CompetitionChannels";
import KnowledgeRetrieval from "@/pages/KnowledgeRetrieval";
import Navbar from "@/components/Navbar";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <div className="min-h-screen grid-bg relative">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/basics" element={<BlockchainBasics />} />
            <Route path="/languages" element={<ProgrammingLanguages />} />
            <Route path="/competitions" element={<CompetitionChannels />} />
            <Route path="/knowledge" element={<KnowledgeRetrieval />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </AuthContext.Provider>
  );
}
