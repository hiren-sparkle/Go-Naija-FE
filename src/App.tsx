  import { Toaster } from "@/components/ui/toaster";
  import { Toaster as Sonner } from "@/components/ui/sonner";
  import { TooltipProvider } from "@/components/ui/tooltip";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  import { BrowserRouter, Routes, Route } from "react-router-dom";

  import { PlayerProvider } from "./contexts/PlayerContext";
  import { GlobalMusicPlayerProvider, useGlobalMusicPlayer } from "./contexts/GlobalMusicPlayerContext"; // ✅ NEW

  import Index from "./pages/Index";
  import Search from "./pages/Search";
  import Library from "./pages/Library";
  // import AlbumDetails from "./pages/AlbumDetails";
  import NotFound from "./pages/NotFound";
  import Signup from "./pages/Signup";
  import Login from "./pages/Login";
  import VerifyEmail from "./pages/VerifyEmail";
  import TrendingSongsPage from "./pages/TrendingSongsPage";
  import TrendingPlaylistsPage from "./pages/TrendingPlaylistsPage";
  import TrendingArtistsPage from "./pages/TrendingArtistsPage";
  import AccountPage from "./pages/Account";
  import SongDetails from "./pages/SongDetails";
  import WatchDetails from "./pages/WatchDetails";
  import PrivateRoute from "./pages/PrivateRoute";
  import LandingPage from "./pages/LandingPage";

  import GlobalMusicPlayer from "./components/layout/GlobalMusicPlayer"; // ✅ Ensure correct path

  const queryClient = new QueryClient();

  const App = () =>(
    
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PlayerProvider>
          <GlobalMusicPlayerProvider> {/* ✅ Wrap with GlobalMusicPlayer Context */}
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                {/* Uncomment and edit these as needed */}
                {/* <Route element={<PrivateRoute />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/verify-email" element={<VerifyEmail />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/landing" element={<LandingPage />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/album/:id" element={<AlbumDetails />} />
                  <Route path="/trending-songs" element={<TrendingSongsPage />} />
                  <Route path="/playlists" element={<TrendingPlaylistsPage />} />
                  <Route path="/trending-artists" element={<TrendingArtistsPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/song/:id" element={<SongDetails />} />
                  <Route path="/watch/:id" element={<WatchDetails />} />
                </Route> */}
              </Routes>
            </BrowserRouter>
              <GlobalMusicPlayer />
          </GlobalMusicPlayerProvider>
        </PlayerProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
  
  export default App;
