import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

const SongDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [song, setSong] = useState<any>(null);
  const [trendingSongs, setTrendingSongs] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchTrendingSongs(id);
  }, [id]);

  const fetchTrendingSongs = async (videoId: string) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/youtube/song`);
      setTrendingSongs(response.data);

      const index = response.data.findIndex((song) => song.id.videoId === videoId);
      setCurrentIndex(index);

      if (index !== -1) {
        setSong(response.data[index]);
      } else {
        toast({ title: "Song not found", description: "Could not load song.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to load trending songs.", variant: "destructive" });
    }
  };

  const playAudio = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);

    const videoId = trendingSongs[index]?.id.videoId;
    const player = document.getElementById("videoPlayer") as HTMLIFrameElement;
    if (!player) return;

    player.setAttribute("src", `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0`);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
    const player = document.getElementById("videoPlayer") as HTMLIFrameElement;
    if (isPlaying) {
      player?.setAttribute("src", player.src.replace("?autoplay=1", "?autoplay=0"));
    } else {
      player?.setAttribute("src", player.src.replace("?autoplay=0", "?autoplay=1"));
    }
  };

  const prevSong = () => {
    if (currentIndex > 0) {
      playAudio(currentIndex - 1);
    }
  };

  const nextSong = () => {
    if (currentIndex < trendingSongs.length - 1) {
      playAudio(currentIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <TopBar />
      <main className="pt-4 pb-24 pl-64">
        <div className="max-w-screen-2xl mx-auto px-8">
          <section className="pt-8 pb-6 flex items-center gap-6">
            {/* <img src={song?.snippet?.thumbnails?.high?.url} alt={song?.snippet?.title} className="w-48 h-48 rounded-lg shadow-lg" /> */}
            <div>
              <h1 className="text-4xl font-bold">{song?.snippet?.title}</h1>
              <p className="text-sm text-gray-400">{song?.snippet?.channelTitle}</p>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="w-full max-w-2xl mt-5">
            <div className="video-container">
            <iframe
            height="400px"
            width="100%"
  id="videoPlayer"
  frameBorder="0"
  allow="autoplay; encrypted-media"
  src={`https://www.youtube-nocookie.com/embed/${trendingSongs[currentIndex]?.id.videoId}
    ?autoplay=1
    &modestbranding=1
    &rel=0
    &controls=0  /* Hides UI controls */
    &disablekb=1
    &fs=0
    &showinfo =0
    &iv_load_policy=3
    &playsinline=1
  `.replace(/\s+/g, '')} 
></iframe>

  <div className="video-overlay"></div>
</div>




              <div className="controls flex justify-center gap-4 mt-4">
                <button onClick={prevSong} className="text-white hover:text-gray-400">
                  <SkipBack size={30} />
                </button>
                <button onClick={togglePlayPause} className="text-white hover:text-gray-400">
                  {isPlaying ? <Pause size={30} /> : <Play size={30} />}
                </button>
                <button onClick={nextSong} className="text-white hover:text-gray-400">
                  <SkipForward size={30} />
                </button>
              </div>
            </div>

            <div className="w-full ml-6">
              <h3 className="text-2xl font-semibold mb-4">Trending Songs</h3>
              <div className="bg-gray-800 rounded-lg p-6 space-y-4 h-[600px] overflow-y-auto">
                {trendingSongs.map((video, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-3 rounded-lg cursor-pointer ${currentIndex === index ? "bg-gray-600" : "hover:bg-gray-700"}`}
                    onClick={() => playAudio(index)}
                  >
                    <img src={video.snippet.thumbnails.default.url} className="w-16 h-16 rounded-md mr-4" />
                    <div className="flex-1">
                      <p className="text-white text-sm">{video.snippet.title}</p>
                      <p className="text-gray-400 text-xs">{video.snippet.channelTitle}</p>
                    </div>
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

export default SongDetails;
