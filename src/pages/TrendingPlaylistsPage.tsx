import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import SectionHeader from '@/components/ui/SectionHeader';
import AlbumCard from '@/components/ui/AlbumCard';
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
// Define the structure of a Playlist and Song
interface Playlist {
  snippet: {
    title: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
}

interface Song {
  snippet: {
    title: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
}

const TrendingPlaylistsPage: React.FC = () => {
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:5001/api/youtube/song"),
      axios.get("http://localhost:5001/api/youtube/trending-playlists"),
      axios.get("http://localhost:5001/api/youtube/trending-artists")
    ])
    .then(([songsRes, playlistsRes, artistsRes]) => {
      console.log("Playlists Response:", playlistsRes.data);  // ✅ Debugging
      setSongs(songsRes.data);
      setPlaylists(playlistsRes.data);
      setArtists(artistsRes.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      setLoading(false);
    });
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

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
<div className="flex w-full">
{/* Sidebar component */}
      <div className="w-64 bg-gray-900">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1">
        {/* TopBar component */}
        <TopBar />

        {/* Main content for displaying trending playlists */}
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold text-white mb-6">Trending Playlists</h2>
          <section className="animate-slide-in mb-12" style={{ animationDelay: "0.3s" }}>
              <SectionHeader 
                title="" 
                description="Afrobeat Playlists"
                linkTo="/playlists"
              />

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {playlists.length > 0 ? (
  playlists.map((playlist, index) => (
    <AlbumCard 
      key={playlist?.id?.playlistId || index} 
      id={playlist?.id?.playlistId || "unknown"}
      title={playlist?.snippet?.title || "No Title"}
      artist={playlist?.snippet?.channelTitle || "Unknown Artist"}
      cover={playlist?.snippet?.thumbnails?.medium?.url || "/default-cover.jpg"}
    />
  ))
) : (
  <p className="text-white">No playlists found</p>
)}

  </div>
</section>
        </div>
      </div>
    </div>
  );
};

export default TrendingPlaylistsPage;
