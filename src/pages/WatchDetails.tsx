import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Play, Pause, SkipBack, SkipForward, ThumbsUp, Share2 } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

const WatchDetails = () => {
    const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [video, setVideo] = useState<any>(null);
  const [relatedVideos, setRelatedVideos] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchVideoDetails(id);
  }, [id]);

  const fetchVideoDetails = async (videoId: string) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/youtube/video/${videoId}`);
      setVideo(response.data);
      fetchRelatedVideos(videoId);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch video details", error);

    }
  };
  
  const fetchRelatedVideos = async (videoId: string) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/youtube/related/${videoId}`);
      console.log("Related Videos API Response:", response.data);
      setRelatedVideos(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch related videos", error);

    }
  };
  
  

  const playVideo = (videoId: string) => {
    navigate(`/watch/${videoId}`);
  };
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
    <div className="min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <TopBar />
      <main className="pt-4 pb-24 pl-64">
        <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Main Video Section */}
          <div className="lg:col-span-2">
            {video && (
              <>
                <div className="relative w-full h-[450px]">
                  <iframe
                  width="100%"
                   height="100%"
                    id="videoPlayer"
                    className="w-full h-full rounded-lg shadow-lg"
                    src={`https://www.youtube.com/embed/${id}?autoplay=1&controls=1&modestbranding=1&rel=0`}
                    allow="autoplay; encrypted-media"
                    frameBorder="0"
                  ></iframe>
                </div>

                <h1 className="text-2xl font-bold mt-4">{video.snippet.title}</h1>
                <p className="text-gray-400 text-sm mt-1">{video.snippet.channelTitle}</p>

                {/* <div className="flex items-center justify-between mt-3">
                 

                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 px-3 py-1 bg-gray-800 rounded-md hover:bg-gray-700 transition">
                      <ThumbsUp className="w-5 h-5" />
                      <span>{parseInt(video.statistics.likeCount).toLocaleString()}</span>
                    </button>

                    <button className="flex items-center gap-1 px-3 py-1 bg-gray-800 rounded-md hover:bg-gray-700 transition">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div> */}
              </>
            )}
          </div>

          {/* Related Videos Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-4">Related Videos</h3>
            <div className="space-y-4 h-[700px] overflow-y-auto">
              {relatedVideos.map((video, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-800 p-3 rounded-lg"
                  onClick={() => playVideo(video.id.videoId)}
                >
                  <img
                    src={video.snippet.thumbnails.default.url}
                    className="w-24 h-14 rounded-md"
                    alt={video.snippet.title}
                  />
                  <div>
                    <p className="text-white text-sm line-clamp-2">{video.snippet.title}</p>
                    <p className="text-gray-400 text-xs">{video.snippet.channelTitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default WatchDetails;
