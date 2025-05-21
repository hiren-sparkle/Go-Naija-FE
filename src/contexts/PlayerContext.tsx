import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Track } from '@/lib/api';

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  queue: Track[];
  isShuffleOn: boolean;
  isRepeatOn: boolean;
  playTrack: (track: Track, tracks?: Track[]) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  handleTrackEnd: () => void;
  currentPlaylist: Track[];
  volume: number;
  setVolume: (volume: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<Track[]>([]);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const [volume, setVolume] = useState(0.7);

  // Play track and set queue
  const playTrack = useCallback((track: Track, tracks: Track[] = []) => {
    setCurrentTrack(track);
    setIsPlaying(true);

    // Set the queue if provided
    if (tracks.length > 0) {
      setQueue(tracks);
    }
  }, []);

  // Pause track
  const pauseTrack = () => {
    setIsPlaying(false);
  };

  // Resume track
  const resumeTrack = () => {
    setIsPlaying(true);
  };

  // Toggle shuffle on/off
  const toggleShuffle = () => {
    setIsShuffleOn((prev) => !prev);
  };

  // Toggle repeat on/off
  const toggleRepeat = () => {
    setIsRepeatOn((prev) => !prev);
  };

  // Move to next track
  const nextTrack = () => {
    if (!currentTrack || queue.length === 0) return;

    const currentIndex = queue.findIndex((track) => track.id === currentTrack.id);
    if (currentIndex < queue.length - 1) {
      setCurrentTrack(queue[currentIndex + 1]);
      setIsPlaying(true);
    } else if (isRepeatOn) {
      // Loop back to the first track if repeat is on
      setCurrentTrack(queue[0]);
      setIsPlaying(true);
    }
  };

  // Move to previous track
  const prevTrack = () => {
    if (!currentTrack || queue.length === 0) return;

    const currentIndex = queue.findIndex((track) => track.id === currentTrack.id);
    if (currentIndex > 0) {
      setCurrentTrack(queue[currentIndex - 1]);
      setIsPlaying(true);
    }
  };

  // Handle track end (next track or repeat behavior)
  const handleTrackEnd = () => {
    if (isRepeatOn) {
      setCurrentTrack(currentTrack);
      setIsPlaying(true); // Restart the current track
    } else {
      nextTrack();
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        queue,
        isShuffleOn,
        isRepeatOn,
        playTrack,
        pauseTrack,
        resumeTrack,
        nextTrack,
        prevTrack,
        toggleShuffle,
        toggleRepeat,
        handleTrackEnd,
        currentPlaylist: queue,
    volume,
    setVolume
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
