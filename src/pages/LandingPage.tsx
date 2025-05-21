import { useState, useEffect } from 'react';
import { useGlobalMusicPlayer } from '../contexts/GlobalMusicPlayerContext';
import logo from '../images/logo1.png';

const backgroundImages = [
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1024',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=1024',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1024',
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=1024',
  'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&q=80&w=1024'
];

function LandingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasClickedPlay, setHasClickedPlay] = useState(false);
  const { setIsPlaying ,setShowPlayer } = useGlobalMusicPlayer();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePlayClick = () => {
    setIsPlaying(true);
    setShowPlayer(true);        
    setHasClickedPlay(true);    
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Images */}
      {backgroundImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt={`Background ${index + 1}`}
            className="object-cover w-full h-full"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
      ))}

      {/* Floating Notes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute animate-float-slow top-10 left-10 text-white text-4xl opacity-20">🎵</div>
        <div className="absolute animate-float-slower top-1/3 right-10 text-white text-3xl opacity-20">🎶</div>
        <div className="absolute animate-float-slow bottom-10 left-1/4 text-white text-5xl opacity-20">✨</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          className="absolute top-4 left-4 w-64 h-auto animate-fade-in drop-shadow-lg"
        />

        {/* Text Content */}
        <div className="flex flex-col items-center justify-center text-center space-y-3 animate-slide-in">
          <h1 className="text-6xl font-extrabold text-white animate-fade-in">
            Go Naija Radio
          </h1>

          <div className="w-64 h-1 mx-auto my-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full animate-fade-in delay-300"></div>

          <h2 className="text-3xl font-semibold text-white animate-fade-in delay-500">
            Let The Beat Take You Home
          </h2>

          <p className="text-lg text-white mt-4 opacity-80 animate-fade-in delay-700">
            Vibe to the best tunes of Naija, wherever you are.
          </p>

          {/* Play Music Button (shows only before clicked) */}
          {!hasClickedPlay && (
            <button
              onClick={handlePlayClick}
              className="px-10 py-4 text-2xl font-bold text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-all duration-300 animate-fade-in mt-6 shadow-xl hover:shadow-2xl"
            >
              Play Music
            </button>
          )}
        </div>

        {/* Artist Selection Buttons (appear after clicking play) */}
        {hasClickedPlay && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 animate-slide-up-buttons mt-10">
            <button
              className="px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              Emerging Artist
            </button>
            <button
              className="px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              Upcoming Artist
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
