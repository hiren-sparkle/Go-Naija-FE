<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Clock, Heart } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import MusicPlayer from '@/components/layout/MusicPlayer';
import TrackList from '@/components/ui/TrackList';
import { getAlbumsByGenre, getTracks, Album, Track } from '@/lib/api';
import { usePlayer } from '@/contexts/PlayerContext';
import { error, nowPlaying } from '@/lib/notifications';
=======
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"; // Icons
>>>>>>> 01e8031 (Initial commit)

const AlbumDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<any>(null);
  const [tracks, setTracks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPlaylist, setCurrentPlaylist] = useState<string[]>([]); 
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5001/api/youtube/trending-playlists`);
        if (!response.data || !Array.isArray(response.data)) {
          toast({ title: "Error", description: "Failed to load playlist data.", variant: "destructive" });
          return;
        }

        const foundPlaylist = response.data.find((pl) => pl.id.playlistId === id);
        if (foundPlaylist) {
          setPlaylist(foundPlaylist);
          fetchVideos(foundPlaylist.id.playlistId);
        } else {
<<<<<<< HEAD
          error({
            title: "Album not found",
            description: "The requested album could not be found"
          });
        }
      } catch (err) {
        console.error("Error fetching album details:", err);
        error({
          title: "Error",
          description: "Failed to load album details"
        });
=======
          toast({ title: "Playlist not found", description: "The requested playlist could not be found.", variant: "destructive" });
        }
      } catch (error) {
        toast({ title: "Error", description: "Failed to load playlist details.", variant: "destructive" });
>>>>>>> 01e8031 (Initial commit)
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylistDetails();
  }, [id]);

  const fetchVideos = (playlistId: string) => {
    fetch(`http://localhost:5001/api/youtube/playlist/${playlistId}`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched Videos Data:", data); // 🛠 Debugging Line
  
<<<<<<< HEAD
  const handlePlayAll = () => {
    if (tracks.length > 0) {
      playTrack(tracks[0], tracks);
      nowPlaying(tracks[0].title, tracks[0].artist);
    }
=======
        if (!data.videos || data.videos.length === 0) {
          console.log("No videos found in the playlist.");
          return;
        }
  
        const videoIds = data.videos.map(video => video.videoId);
        setCurrentPlaylist(videoIds);
        setTracks(data.videos);
  
        if (videoIds.length > 0) {
          playVideo(0);
        }
      })
      .catch(error => console.error("Error fetching videos:", error));
>>>>>>> 01e8031 (Initial commit)
  };
  

  const playVideo = (index: number) => {
    setCurrentIndex(index);
    const videoId = currentPlaylist[index];
    const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&rel=0&showinfo=0&modestbranding=1`;
    document.getElementById("videoPlayer")?.setAttribute("src", videoUrl);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
    const player = document.getElementById("videoPlayer") as HTMLIFrameElement;
    if (isPlaying) {
      player?.setAttribute("src", player.src.replace("?autoplay=1", "?autoplay=0"));
    } else {
      player?.setAttribute("src", player.src.replace("?autoplay=0", "?autoplay=1"));
    }
  };

  const nextVideo = () => {
    const nextIndex = currentIndex === currentPlaylist.length - 1 ? 0 : currentIndex + 1;
    playVideo(nextIndex);
  };

  const prevVideo = () => {
    const prevIndex = currentIndex === 0 ? currentPlaylist.length - 1 : currentIndex - 1;
    playVideo(prevIndex);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <TopBar />
      <main className="pt-4 pb-24 pl-64">
        <div className="max-w-screen-2xl mx-auto px-8">
          <section className="pt-8 pb-12">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-end">
              {/* <img
                // src={playlist?.snippet?.thumbnails?.high?.url}
                alt={playlist?.snippet?.title}
                className="w-64 rounded-lg shadow-lg"
              /> */}
              <div>
                <h1 className="text-4xl font-bold">{playlist?.snippet?.title}</h1>
                <p className="text-sm text-gray-400">{playlist?.snippet?.channelTitle}</p>
              </div>
            </div>
          </section>

          {/* Grid Layout: Video Player & Playlist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Video Player Section */}
            <div className="player-container  flex flex-col items-center">
            <iframe
                id="videoPlayer"
                width="auto"
                height="auto"
                title="YouTube video player"
                frameBorder="0"
                className="rounded-lg shadow-lg w-full max-w-[600px] h-[340px]"
                
                src={`https://www.youtube.com/embed/${currentPlaylist[currentIndex]}?autoplay=1&controls=1&modestbranding=1&rel=0&iv_load_policy=3&fs=0&disablekb=1&playsinline=1&enablejsapi=1`}
              ></iframe>

              {/* Controls */}
              <div className="controls flex justify-center gap-4 mt-4">
                <button onClick={prevVideo} className="text-white hover:text-gray-400">
                  <SkipBack size={30} />
                </button>
                <button onClick={togglePlayPause} className="text-white hover:text-gray-400">
                  {isPlaying ? <Pause size={30} /> : <Play size={30} />}
                </button>
                <button onClick={nextVideo} className="text-white hover:text-gray-400">
                  <SkipForward size={30} />
                </button>
              </div>
            </div>

            {/* Playlist Section */}
            <div className="playlist-container">
                  <h3 className="text-2xl font-semibold text-white mb-4">Playlist</h3>
                  <div className="bg-gray-800 rounded-lg p-4 space-y-4 h-[600px] overflow-y-auto">
                  {tracks.map((video, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-4 cursor-pointer hover:bg-gray-700 rounded-lg ${currentIndex === index ? "bg-gray-600" : ""}`}
                    onClick={() => playVideo(index)}
                  >
                    <img
                      src={video.thumbnail || "https://via.placeholder.com/150"} // ✅ Use placeholder if missing
                      alt={video.title || "No title available"} // ✅ Fallback text
                      className="w-12 h-12 rounded-md mr-4"
                    />
                    <div className="flex-1 text-white">{video.title || "Unknown Title"}</div> {/* ✅ Fix missing title */}
                    <div className="text-gray-400 text-sm">{video.channelTitle || "Unknown Channel"}</div> {/* ✅ Fix missing channel */}
                  </div>
                ))}

            </div>
          </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AlbumDetails;
