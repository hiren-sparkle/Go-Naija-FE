import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import SectionHeader from '@/components/ui/SectionHeader';
import SongCard from '@/components/ui/SongCard';

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

const TrendingSongsPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    setLoading(true); // Start loading
    axios.get("http://localhost:5001/api/youtube/song")
      .then((res) => {
        console.log("Fetched Songs:", res.data.length); // Debugging
        setSongs(res.data);
      })
      .catch((err) => console.error("Error fetching songs:", err))
      .finally(() => setLoading(false)); // Stop loading
  }, []);
  

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen text-white">
  //       <div className="wave-bars">
  //         <div className="animate-wave-1"></div>
  //         <div className="animate-wave-2"></div>
  //         <div className="animate-wave-3"></div>
  //         <div className="animate-wave-4"></div>
  //       </div>
  //     </div>
  //   );
  // }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex">
      {/* Sidebar component */}
      <div className="w-64 bg-gray-900">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1">
        {/* TopBar component */}
        <TopBar />

        {/* Main content for displaying trending songs */}
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold text-white mb-6">Trending Songs</h2>



 <section className="animate-slide-in mb-12" style={{ animationDelay: "0.2s" }}>
  <SectionHeader 
    title="" 
    description="Top trending songs on YouTube" 
    linkTo="/song" 
  />

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
    {songs.map((song) => (  
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
          
        </div>
      </div>
    </div>
  );
};

export default TrendingSongsPage;
