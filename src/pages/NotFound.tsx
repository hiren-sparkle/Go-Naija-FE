
import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-music-primary to-music-background text-music-text">
      <div className="text-center max-w-md px-6">
        <h1 className="text-7xl font-bold mb-4 text-music-accent">404</h1>
        <p className="text-xl mb-8">Oops! We couldn't find that track.</p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 rounded-full bg-music-accent text-white font-medium hover:scale-105 hover:bg-opacity-90 smooth-transition"
        >
          <Home className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
