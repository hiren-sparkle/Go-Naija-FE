import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import SectionHeader from "@/components/ui/SectionHeader";
import AlbumCard from "@/components/ui/AlbumCard";

const ArtistDetailsPage = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const [artist, setArtist] = useState<any>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!artistId) return;

    axios
      .get(`http://localhost:5001/api/youtube/trending-artists`)
      .then((res) => {
        setArtist(res.data.artist);
        setPlaylists(res.data.playlists);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching artist data:", err);
        setError("Failed to load artist details.");
        setLoading(false);
      });
  }, [artistId]);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <TopBar />
        <div className="container mx-auto p-4">
          {/* Artist Details */}
          <div className="flex items-center space-x-6">
            <img
              src={artist?.snippet?.thumbnails?.high?.url}
              alt={artist?.snippet?.title}
              className="w-40 h-40 rounded-full shadow-lg"
            />
            <div>
              <h2 className="text-3xl font-bold text-white">{artist?.snippet?.title}</h2>
              <p className="text-gray-400">YouTube Artist</p>
            </div>
          </div>

          {/* Playlists Section */}
          <SectionHeader title={`${artist?.snippet?.title}'s Playlists`} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {playlists.map((playlist) => (
              <AlbumCard
                key={playlist.id.playlistId}
                id={playlist.id.playlistId}
                title={playlist.snippet.title}
                artist={artist?.snippet?.title}
                cover={playlist.snippet.thumbnails.medium.url}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetailsPage;
