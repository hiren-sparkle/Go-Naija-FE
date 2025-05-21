import React from 'react';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FeaturedBannerProps {
  title: string;
  description: string;
  coverImage: string;
  type: 'album' | 'playlist' | 'artist';
  playlistId: string; // ✅ Accept playlist ID as a prop
}

const FeaturedBanner: React.FC<FeaturedBannerProps> = ({
  title,
  description,
  coverImage,
  type,
  playlistId
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-xl animate-scale-in">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={coverImage} 
          alt={title} 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-music-primary via-music-primary/70 to-transparent" />
      </div>
      
      {/* Banner Content */}
      <div className="relative z-0 p-8 flex items-end h-[350px] ">
        <div className="max-w-3xl">
          <div className="mb-4">
            <span className="uppercase text-xs font-semibold tracking-wider px-3 py-1 bg-music-accent/20 border border-music-accent/30 rounded-full">
              Featured {type}
            </span>
          </div>
          
          <h1 className="text-5xl font-bold mb-3">{title}</h1>
          <p className="text-music-subtle mb-6 max-w-xl">{description}</p>

          {/* Play Now Button */}
          <div className="flex items-center gap-4 mt-4">
            <button 
              onClick={() => navigate(`/album/${playlistId}`)} // ✅ Navigate using correct playlist ID
              className="h-12 px-6 rounded-full bg-music-accent text-white font-medium flex items-center gap-2 hover:scale-105 hover:bg-opacity-90 smooth-transition"
            >
              <Play className="h-5 w-5 ml-0.5" />
              Play Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FeaturedBanner;
