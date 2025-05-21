import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import { useGlobalMusicPlayer } from "@/contexts/GlobalMusicPlayerContext";

type Track = {
  name: string;
  link: string;
  image?: string;
};

const ytUrls: Track[] = [
  { name: "Ayra Star - Rush (official Extended)", link: "https://www.youtube.com/watch?v=W1Uioqmyntw", image: "https://res.cloudinary.com/dqb3ctnmc/image/upload/v1746012819/grox1mlddbigh79ohszn.png" },
  { name: "Diamond Platnumz Ft Koffi Olomide - Waah!", link: "https://www.youtube.com/watch?v=E6-odBASxKk", image: "https://res.cloudinary.com/dqb3ctnmc/image/upload/v1746012935/p79fzjsqnnr74tbkbkjq.png" },
  { name: "Burna Boy - It's Plenty", link: "https://www.youtube.com/watch?v=fXKmPAsstxI", image: "https://res.cloudinary.com/dqb3ctnmc/image/upload/v1746013026/czdx73x4khmnsc1frbdr.png" },
  { name: "Aya Nakamura - Djadja", link: "https://www.youtube.com/watch?v=GBna0zUrXXE", image: "https://res.cloudinary.com/dqb3ctnmc/image/upload/v1746013094/dikmhg0hhlgm4wmeg9sh.png" },
  { name: "Ruger - Bounce", link: "https://www.youtube.com/watch?v=W9vvxOF99Rc", image: "https://res.cloudinary.com/dqb3ctnmc/image/upload/v1746013193/uh9qlxevyvhrqspjkujg.png" },
  { name: "Khaid & Boy Spyce - Carry Me Go", link: "https://www.youtube.com/watch?v=QAt0Yn_bMEg", image: "https://res.cloudinary.com/dqb3ctnmc/image/upload/v1746013254/n3ltxydkbeuu4xdyuo23.png" },
  { name: "CKay - Emiliana", link: "https://www.youtube.com/watch?v=_DaYpGF9e84", image: "https://res.cloudinary.com/dqb3ctnmc/image/upload/v1746013350/q6fknapyk4ewnimjk81e.png" },
  { name: "Diamond Platnumz - Jeje", link: "https://www.youtube.com/watch?v=RMeF0GfufEg", image: "https://res.cloudinary.com/dqb3ctnmc/image/upload/v1746013417/pudamyuozzupp152lusm.png" },
  { name: "Kizz Daniel - Lie", link: "https://www.youtube.com/watch?v=8SvJx-TCiQY", image: "https://res.cloudinary.com/dqb3ctnmc/image/upload/v1746013537/rrielksxy2ga1apmvykl.png" },
];

const GlobalMusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(() => {
    return Math.floor(Math.random() * ytUrls.length);
  });

  const [volume, setVolume] = useState<number>(() => {
    const storedVol = parseFloat(localStorage.getItem("volume") || "0.8");
    return isNaN(storedVol) ? 0.8 : storedVol;
  });

  const [progress, setProgress] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);
  const { isPlaying, setIsPlaying, togglePlay, showPlayer } = useGlobalMusicPlayer();

  const currentTrack = ytUrls[currentTrackIndex];

  useEffect(() => {
    localStorage.setItem("volume", volume.toString());
  }, [volume]);

  const handleNext = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * ytUrls.length);
    } while (nextIndex === currentTrackIndex && ytUrls.length > 1);

    setCurrentTrackIndex(nextIndex);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    let prevIndex;
    do {
      prevIndex = Math.floor(Math.random() * ytUrls.length);
    } while (prevIndex === currentTrackIndex && ytUrls.length > 1);

    setCurrentTrackIndex(prevIndex);
    setIsPlaying(true);
  };

  const handleProgress = (state: { played: number }) => {
    setProgress(state.played);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = parseFloat(e.target.value);
    playerRef.current?.seekTo(seekTo);
    setProgress(seekTo);
  };

  const handleEnded = () => {
    handleNext();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay]);

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 w-full bg-white text-black z-50 group transform transition-all duration-500 ease-in-out
        ${showPlayer ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}
      >
        <input
          type="range"
          min={0}
          max={1}
          step={0.001}
          value={progress}
          onChange={handleSeek}
          className="w-full h-1 accent-purple-500 cursor-pointer absolute
            [&::-webkit-slider-thumb]:opacity-0
            group-hover:[&::-webkit-slider-thumb]:opacity-100
            transition-opacity duration-300"
        />

        <div className="sm:hidden flex flex-col items-center justify-center pt-2">
          <img src={currentTrack.image} alt={currentTrack.name} className="w-12 h-12 object-cover rounded mb-1" />
          <div className="text-sm font-semibold text-center truncate max-w-[200px]">
            {currentTrack.name}
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-4">
          <div className="w-1/3 hidden sm:flex items-center gap-3 overflow-hidden">
            <img src={currentTrack.image} alt={currentTrack.name} className="w-10 h-10 object-cover rounded" />
            <div className="overflow-hidden">
              <div className="text-sm font-semibold text-black truncate">{currentTrack.name}</div>
            </div>
          </div>

          <div className="w-full sm:w-1/3 flex justify-center items-center gap-6 text-xl">
            <button onClick={handlePrev} className="hover:text-purple-400">
              <svg className="w-6 h-6 fill-current mx-auto" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6V6zm3.5 6 8.5 6V6l-8.5 6z" />
              </svg>
            </button>

            <button onClick={togglePlay} className="hover:text-purple-400">
              {isPlaying ? (
                <svg className="w-8 h-8 fill-current mx-auto" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-8 h-8 fill-current mx-auto" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button onClick={handleNext} className="hover:text-purple-400">
              <svg className="w-6 h-6 fill-current mx-auto" viewBox="0 0 24 24">
                <path d="M16 6h2v12h-2V6zm-3.5 6L4 18V6l8.5 6z" />
              </svg>
            </button>
          </div>

          <div className="w-1/3 justify-end items-center gap-2 text-sm hidden sm:flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-black hover:text-purple-400">
              <path d="M7 9v6h4l5 5V4l-5 5H7z" />
            </svg>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="accent-black w-24 h-1 cursor-pointer"
            />
          </div>
        </div>

        <ReactPlayer
          ref={playerRef}
          url={currentTrack.link}
          playing={isPlaying}
          volume={volume}
          onProgress={handleProgress}
          onEnded={handleEnded}
          width="0"
          height="0"
          style={{ display: "none" }}
        />
      </div>
    </>
  );
};

export default GlobalMusicPlayer;
