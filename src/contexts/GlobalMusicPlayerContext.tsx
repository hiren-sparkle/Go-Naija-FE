import React, { createContext, useContext, useEffect, useState } from "react";

type MusicPlayerContextType = {
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  togglePlay: () => void;
  showPlayer: boolean;
  setShowPlayer: (value: boolean) => void;
};

const GlobalMusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export const useGlobalMusicPlayer = () => {
  const context = useContext(GlobalMusicPlayerContext);
  if (!context) throw new Error("useGlobalMusicPlayer must be used within its provider");
  return context;
};

export const GlobalMusicPlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  // Load from localStorage on first mount
  useEffect(() => {
    const hasClicked = localStorage.getItem("hasClickedPlay");
    if (hasClicked === "true") {
      setShowPlayer(true);
    }
  }, []);

  const togglePlay = () => setIsPlaying(prev => !prev);

  return (
    <GlobalMusicPlayerContext.Provider
      value={{ isPlaying, setIsPlaying, togglePlay, showPlayer, setShowPlayer }}
    >
      {children}
    </GlobalMusicPlayerContext.Provider>
  );
};
