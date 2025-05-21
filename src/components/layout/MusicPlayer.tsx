
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Repeat, Shuffle, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePlayer } from '@/contexts/PlayerContext';
import { toast } from "@/components/ui/use-toast";

const MusicPlayer: React.FC = () => {
  const { 
    currentTrack, 
    isPlaying, 
    playTrack, 
    pauseTrack, 
    resumeTrack, 
    nextTrack, 
    prevTrack 
  } = usePlayer();
  
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        console.log("Playback started");
      }).catch(error => {
        console.error("Playback failed:", error);
        toast({
          title: "Playback Error",
          description: "Unable to play this track. Please try another.",
          variant: "destructive"
        });
      });
    }
  }, [isPlaying]);
  useEffect(() => {
    if (audioRef.current) {
      console.log("Audio element is initialized", audioRef.current);
    } else {
      console.log("Audio element is not yet available");
    }
  }, [audioRef]); // This will run whenever the audioRef changes
  
  
  useEffect(() => {
    if (audioRef.current) {
      // Set up audio element
      const audio = audioRef.current;
      
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };
      
      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };
      
      const handleEnded = () => {
        if (isRepeatOn) {
          setCurrentTime(0);
          audio.currentTime = 0;
          audio.play();
        } else {
          nextTrack();
        }
      };
      
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);
      
      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [isRepeatOn, nextTrack]);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    console.log(audioRef.current); // Log the audio element to check if it's correctly initialized
    console.log("Volume changed to:", volume); // Log the volume change
  }, [volume]);
  
  const togglePlay = () => {
    if (!currentTrack) return;
    
    if (isPlaying) {
      pauseTrack();
    } else {
      resumeTrack();
    }
  };
  
  const handleProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioRef.current || !currentTrack) return;
    
    const progressRect = progressBarRef.current.getBoundingClientRect();
    const seekPosition = (e.clientX - progressRect.left) / progressRect.width;
    
    if (audioRef.current.duration) {
      audioRef.current.currentTime = seekPosition * audioRef.current.duration;
    }
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
  };
  
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Wave animation for currently playing track
  const WaveAnimation = () => (
    <div className="wave-bars ml-3">
      <div className={`animate-wave-1 ${isPlaying ? 'h-[70%]' : 'h-[20%]'}`}></div>
      <div className={`animate-wave-2 ${isPlaying ? 'h-full' : 'h-[20%]'}`}></div>
      <div className={`animate-wave-3 ${isPlaying ? 'h-[60%]' : 'h-[20%]'}`}></div>
      <div className={`animate-wave-4 ${isPlaying ? 'h-[80%]' : 'h-[20%]'}`}></div>
    </div>
  );
  
  // If no track is playing, show a minimal player
  if (!currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 glass border-t border-white/5 px-4 py-3 z-30">
        <div className="flex items-center justify-center text-music-subtle">
          Select a track to start playing
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 glass border-t border-white/5 px-4 py-3 z-30">
      <audio 
        ref={audioRef} 
        src={currentTrack?.audioUrl} 
        onError={() => {
          pauseTrack();
          toast({
            title: "Playback Error",
            description: "Unable to play this track. Please try another.",
            variant: "destructive"
          });
        }}
      />
      
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        {/* Currently playing song info */}
        <div className="flex items-center w-1/4">
          <img 
            src={currentTrack.albumCover} 
            alt={currentTrack.title} 
            className="h-14 w-14 rounded object-cover shadow-md"
          />
          <div className="ml-3">
            <h4 className="text-sm font-medium line-clamp-1">{currentTrack.title}</h4>
            <p className="text-xs text-music-subtle">{currentTrack.artist}</p>
          </div>
          <WaveAnimation />
          <button 
            onClick={() => setIsLiked(!isLiked)} 
            className="ml-4 smooth-transition"
          >
            <Heart 
              className={cn("h-5 w-5", isLiked ? "fill-music-accent text-music-accent" : "text-music-subtle")} 
            />
          </button>
        </div>
        
        {/* Player controls */}
        <div className="flex flex-col items-center justify-center w-1/2">
          <div className="flex items-center gap-3 mb-1">
            <button 
              className={cn(
                "text-music-subtle hover:text-white smooth-transition", 
                isShuffleOn && "text-music-accent"
              )}
              onClick={() => setIsShuffleOn(!isShuffleOn)}
            >
              <Shuffle className="h-4 w-4" />
            </button>
            <button 
              className="text-music-subtle hover:text-white smooth-transition"
              onClick={prevTrack}
            >
              <SkipBack className="h-5 w-5" />
            </button>
            <button 
              onClick={togglePlay}
              className="h-10 w-10 rounded-full bg-music-accent flex items-center justify-center hover:scale-105 smooth-transition"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </button>
            <button 
              className="text-music-subtle hover:text-white smooth-transition"
              onClick={nextTrack}
            >
              <SkipForward className="h-5 w-5" />
            </button>
            <button 
              className={cn(
                "text-music-subtle hover:text-white smooth-transition", 
                isRepeatOn && "text-music-accent"
              )}
              onClick={() => setIsRepeatOn(!isRepeatOn)}
            >
              <Repeat className="h-4 w-4" />
            </button>
          </div>
          
          <div className="w-full flex items-center gap-2">
            <span className="text-xs text-music-subtle">{formatTime(currentTime)}</span>
            <div 
              ref={progressBarRef}
              onClick={handleProgress}
              className="flex-1 h-1.5 bg-music-surface rounded-full overflow-hidden cursor-pointer"
            >
              <div 
                className="h-full bg-music-accent rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <span className="text-xs text-music-subtle">{formatTime(duration)}</span>
          </div>
        </div>
        
        {/* Volume and additional controls */}
        <div className="flex items-center justify-end w-1/4 gap-4">
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-music-subtle" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-music-surface rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
          </div>
          <button className="text-music-subtle hover:text-white smooth-transition">
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
