import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";

<<<<<<< HEAD
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Bell, User, BellDot } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  AlertTitle,
  AlertDescription,
  Alert 
} from "@/components/ui/alert";

const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hasNotifications, setHasNotifications] = useState(true);

  const clearNotifications = () => {
    setHasNotifications(false);
  };
=======

const TopBar = () => {
  const siteName = import.meta.env.VITE_SITE_NAME; // Move siteName here
>>>>>>> 01e8031 (Initial commit)

  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(JSON.parse(localStorage.getItem("user")!));
    }
  }, []);

  // Fetch YouTube search results
  const fetchSearchResults = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5001/api/youtube/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      setSearchResults(data || []);
    } catch (error) {
      console.error("Error fetching YouTube search results:", error);
    }
  };
  

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSearchResults(query);
  };

  // Clear search results
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <header className="sticky top-0 z-10 glass backdrop-blur-lg pr-4 pl-64 py-4 flex justify-between items-center border-b border-white/5">
      {/* Left Section: Navigation */}
      
      <div className="flex items-center gap-4">

        
      </div>

<<<<<<< HEAD
      <div className="flex items-center gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <button className="h-9 w-9 rounded-full bg-music-surface/80 flex items-center justify-center text-music-subtle hover:text-white smooth-transition relative">
              {hasNotifications ? (
                <BellDot className="h-5 w-5" />
              ) : (
                <Bell className="h-5 w-5" />
              )}
              {hasNotifications && (
                <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-music-accent"></span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 bg-music-surface text-white border-music-surface">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">Notifications</h3>
              <button 
                onClick={clearNotifications}
                className="text-xs text-music-subtle hover:text-white"
              >
                Mark all as read
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto space-y-2">
              <Alert className="bg-music-surface/90 border-music-surface/50">
                <AlertTitle className="text-white">New Release Available</AlertTitle>
                <AlertDescription className="text-music-subtle">
                  Dua Lipa just released a new album "Future Nostalgia"
                </AlertDescription>
              </Alert>
              <Alert className="bg-music-surface/90 border-music-surface/50">
                <AlertTitle className="text-white">Playlist Updated</AlertTitle>
                <AlertDescription className="text-music-subtle">
                  Your "Discover Weekly" playlist has been updated with 30 new songs
                </AlertDescription>
              </Alert>
              <Alert className="bg-music-surface/90 border-music-surface/50">
                <AlertTitle className="text-white">Artist You Follow</AlertTitle>
                <AlertDescription className="text-music-subtle">
                  The Weeknd is performing near you next month
                </AlertDescription>
              </Alert>
            </div>
          </PopoverContent>
        </Popover>
        <button className="h-9 w-9 rounded-full bg-music-accent flex items-center justify-center hover:opacity-90 smooth-transition">
          <User className="h-5 w-5 text-white" />
        </button>
=======
      {/* Center Section: Search Bar */}
      <div className="relative justify-center items-center flex-1 mx-4 max-w-md md:max-w-lg">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search songs, videos, playlists..."
            className="w-full px-4 py-2 bg-transparent border border-gray-500 text-gray-300 rounded-md focus:outline-none focus:border-white transition"
          />
          {searchQuery && (
            <button onClick={clearSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

      {/* Search Results Dropdown */}
{searchResults.length > 0 && (
  <div className="absolute w-full bg-gray-900 border border-gray-700 rounded-md mt-2 max-h-50 overflow-y-auto z-100">
    {searchResults.slice(0, 5).map((result, index) => {
      const videoId = result.id.videoId || result.id.playlistId; // Ensure valid ID
      return (
        <div
          key={index}
          className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-800"
          onClick={() => videoId && navigate(`/watch/${videoId}`)} // Navigate only if valid
        >
          <img
            src={result.snippet.thumbnails.default.url}
            alt={result.snippet.title}
            className="w-14 h-14 rounded-md object-cover"
          />
          <div className="text-gray-300 flex-1">
            <p className="text-sm font-semibold">{result.snippet.title}</p>
            <p className="text-xs text-gray-500">{result.snippet.channelTitle}</p>
          </div>
        </div>
      );
    })}
  </div>
)}

      </div>

      {/* Right Section: Auth Buttons */}
      <div className="flex items-center gap-2">
        {!localStorage.getItem("token") && (
          <>
            <button
              className="hidden md:block px-4 py-2 bg-transparent border border-gray-500 text-gray-300 hover:text-white hover:border-white transition rounded-md"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
            <button
              className="px-4 py-2 bg-white text-black font-semibold rounded-md hover:opacity-90 transition"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          </>
        )}
>>>>>>> 01e8031 (Initial commit)
      </div>
    </header>
  );
};

export default TopBar;
