
import React, { useState } from 'react';
import { Play, Pause, Heart, MoreHorizontal, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePlayer } from '@/contexts/PlayerContext';
import { Track } from '@/lib/api';

interface TrackListProps {
  tracks: Track[];
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  const { currentTrack, isPlaying, playTrack, pauseTrack, resumeTrack } = usePlayer();
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);
  const [likedTracks, setLikedTracks] = useState<string[]>([]);
  
  const handlePlay = (track: Track) => {
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        pauseTrack();
      } else {
        resumeTrack();
      }
    } else {
      playTrack(track, tracks);
    }
  };
  
  const toggleLike = (trackId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedTracks(prev => 
      prev.includes(trackId) 
        ? prev.filter(id => id !== trackId) 
        : [...prev, trackId]
    );
  };
  
  return (
    <div className="w-full">
      <div className="grid grid-cols-12 px-4 py-2 border-b border-white/5 text-music-subtle text-xs font-medium">
        <div className="col-span-1 flex justify-center">#</div>
        <div className="col-span-5">TITLE</div>
        <div className="col-span-3">ALBUM</div>
        <div className="col-span-2">ADDED</div>
        <div className="col-span-1 flex justify-end">
          <Clock className="h-4 w-4" />
        </div>
      </div>
      
      {tracks.map((track, index) => {
        const isHovered = hoveredTrack === track.id;
        const isCurrentTrack = currentTrack?.id === track.id;
        const isCurrentlyPlaying = isCurrentTrack && isPlaying;
        const isLiked = likedTracks.includes(track.id);
        
        return (
          <div 
            key={track.id}
            className={cn(
              "grid grid-cols-12 px-4 py-3 rounded-md text-sm items-center smooth-transition",
              (isHovered || isCurrentTrack) && "bg-music-surface/40",
              "hover:bg-music-surface/40"
            )}
            onMouseEnter={() => setHoveredTrack(track.id)}
            onMouseLeave={() => setHoveredTrack(null)}
            onClick={() => handlePlay(track)}
          >
            <div className="col-span-1 flex justify-center">
              {isHovered || isCurrentTrack ? (
                <button className="h-6 w-6 flex-shrink-0 flex items-center justify-center text-white">
                  {isCurrentlyPlaying ? 
                    <Pause className="h-4 w-4" /> : 
                    <Play className="h-4 w-4 ml-0.5" />
                  }
                </button>
              ) : (
                <span className={cn(
                  "text-music-subtle",
                  isCurrentTrack && "text-music-accent"
                )}>
                  {index + 1}
                </span>
              )}
            </div>
            
            <div className="col-span-5 flex items-center">
              {track.albumCover && (
                <img 
                  src={track.albumCover} 
                  alt={track.album}
                  className="h-10 w-10 rounded mr-3 object-cover"
                />
              )}
              <div>
                <p className={cn(
                  "font-medium line-clamp-1",
                  isCurrentTrack && "text-music-accent"
                )}>
                  {track.title}
                </p>
                <p className="text-xs text-music-subtle line-clamp-1">
                  {track.artist}
                </p>
              </div>
            </div>
            
            <div className="col-span-3 text-music-subtle truncate">
              {track.album}
            </div>
            
            <div className="col-span-2 text-music-subtle">
              3 days ago
            </div>
            
            <div className="col-span-1 flex items-center justify-end gap-3">
              <button 
                onClick={(e) => toggleLike(track.id, e)}
                className={cn(
                  "opacity-0 group-hover:opacity-100",
                  isHovered && "opacity-100",
                  isLiked && "opacity-100"
                )}
              >
                <Heart 
                  className={cn(
                    "h-4 w-4", 
                    isLiked ? "fill-music-accent text-music-accent" : "text-music-subtle hover:text-white"
                  )} 
                />
              </button>
              
              <span className="text-music-subtle">
                {track.duration}
              </span>
              
              <button className={cn(
                "opacity-0",
                isHovered && "opacity-100"
              )}>
                <MoreHorizontal className="h-4 w-4 text-music-subtle hover:text-white" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrackList;
