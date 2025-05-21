import React, { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import FeaturedBanner from '@/components/ui/FeaturedBanner';
import SectionHeader from '@/components/ui/SectionHeader';
import AlbumCard from '@/components/ui/AlbumCard';
import SongCard from '@/components/ui/SongCard';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import axios from 'axios';

const Index = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [featured, setFeatured] = useState<any>(null);
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []); // Runs only once on mount

  // Fetch main content
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [songsRes, playlistsRes, artistsRes] = await Promise.all([
          axios.get("http://localhost:5001/api/youtube/song"),
          axios.get("http://localhost:5001/api/youtube/trending-playlists"),
          axios.get("http://localhost:5001/api/youtube/trending-artists"),
        ]);
  
        setSongs(songsRes.data);
        setPlaylists(playlistsRes.data);
        setArtists(artistsRes.data);
      } catch (err) {
        console.error("Error loading content:", err);
        toast({
          title: "Error",
          description: "Failed to load content",
          variant: "destructive",
        });
      } finally {
        setLoading(false); // ✅ Always hide loader
      }
    };
  
    fetchData();
  }, []);
  

  // Fetch featured playlist
  useEffect(() => {
    const getFeaturedContent = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/youtube/trending-playlists");
        const data = await res.json();

        if (data.length > 0) {
          const selected = data[Math.floor(Math.random() * data.length)];

          setFeatured({
            title: selected.snippet.title,
            description: selected.snippet.description,
            coverImage: selected.snippet.thumbnails?.high?.url,
            type: 'playlist',
            playlistId: selected.id.playlistId, // ✅ Pass correct playlist ID
          });
        }
      } catch (error) {
        console.error("Error fetching featured:", error);
      }
    };

    getFeaturedContent();
  }, []);
    
 if (loading) {
  return (
    <div className="flex justify-center items-center h-screen text-white">
      <div className="wave-bars">
        <div className="animate-wave-1"></div>
        <div className="animate-wave-2"></div>
        <div className="animate-wave-3"></div>
        <div className="animate-wave-4"></div>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-music-primary to-music-background text-music-text">

      {/* Sidebar */}
      <Sidebar />

      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-30 text-white"
          onClick={() => setSidebarOpen(true)}
        >
          {/* <Menu className="w-6 h-6" /> */}
        </button>
      )}

      {/* Main Content */}
      <div className="flex-1  ">

        <main className=" pb-24 px-4 lg:pt-2 sm:pt-2 md:p-1 md:pl-[265px] lg:pl-[270px]  main-banner">
          <TopBar />

          <div className="max-w-screen-2xl mx-auto pt-4">

            {/* Featured Section */}
            {featured && (
              <section className="mb-12 z-0">
                <FeaturedBanner 
                  title=""
                  description={featured.description}
                  coverImage={featured.coverImage}
                  type={featured.type}
                  playlistId={featured.playlistId} // ✅ Pass playlist ID to FeaturedBanner
                />
              </section>
            )}

            {/* Trending Songs */}
            <section className="mb-12 animate-slide-in">
              <SectionHeader title="Trending Songs" description="Top trending songs on YouTube" linkTo="/trending-songs" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {songs.slice(0, 18).map((song) => (
                  <SongCard
                    key={song.id.videoId}
                    id={song.id.videoId}
                    title={song.snippet.title}
                    artist={song.snippet.channelTitle}
                    cover={song.snippet.thumbnails.medium.url}
                  />
                ))}
              </div>
            </section>

            {/* Your Playlists */}
            <section className="mb-12 animate-slide-in">
              <SectionHeader title="Your Playlists" description="Afrobeat Playlists" linkTo="/playlists" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {playlists.slice(0, 18).map((playlist) => (
                  <AlbumCard
                    key={playlist.id.playlistId}
                    id={playlist.id.playlistId}
                    title={playlist.snippet.title}
                    artist={playlist.snippet.channelTitle}
                    cover={playlist.snippet.thumbnails.medium.url}
                  />
                ))}
              </div>
            </section>

            {/* Trending Artists */}
            {/* <section className="mb-12 animate-slide-in">
              <SectionHeader title="Trending Artists" description="Top Afrobeat Artists on YouTube" linkTo="/trending-artists" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {artists.slice(0, 18).map((artist) => (
                  <AlbumCard
                    key={artist.id.channelId}
                    id={artist.id.channelId}
                    title={artist.snippet.title}
                    artist={artist.snippet.channelTitle}
                    cover={artist.snippet.thumbnails.high.url}
                  />
                ))}
              </div>
            </section> */}

          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;