import { Routes, Route } from "react-router";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Games from "./pages/Games";
import GameDetails from "./pages/GameDetails";
import Favorites from "./pages/Favorites";
import ScrollToTop from "./components/ScrollToTop";

import Publishers from "./pages/Publishers";
import PublisherDetails from "./pages/PublisherDetails";

export default function App() {
  return (
    <MainLayout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/publishers" element={<Publishers />} />
        <Route path="/publisher/:slug" element={<PublisherDetails />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </MainLayout>
  );
}
