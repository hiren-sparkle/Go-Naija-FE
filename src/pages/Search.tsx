
import React, { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import MusicPlayer from '@/components/layout/MusicPlayer';
import SectionHeader from '@/components/ui/SectionHeader';
import AlbumCard from '@/components/ui/AlbumCard';
import TrackList from '@/components/ui/TrackList';
import { searchContent, Album, Track, Playlist } from '@/lib/api';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const [searchResults, setSearchResults] = useState<{
    tracks: Track[];
    albums: Album[];
    playlists: Playlist[];
  }>({
    tracks: [],
    albums: [],
    playlists: []
  });
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setSearchResults({ tracks: [], albums: [], playlists: [] });
      return;
    }
    
    setIsSearching(true);
    
    try {
      const results = await searchContent(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
      toast({
        title: "Error",
        description: "Search failed. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };
  
  const hasResults = 
    searchResults.tracks.length > 0 || 
    searchResults.albums.length > 0 || 
    searchResults.playlists.length > 0;
  
  const totalResults = 
    searchResults.tracks.length + 
    searchResults.albums.length + 
    searchResults.playlists.length;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-music-primary to-music-background text-music-text">
      <Sidebar />
      <TopBar />
      
      <main className="pt-4 pb-24 pl-64">
        <div className="max-w-screen-2xl mx-auto px-8">
          <section className="mb-8 animate-slide-in">
            <SectionHeader title="Search" description="Find your favorite songs, artists, albums and playlists" />
            
            <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-music-subtle h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-4 pl-12 pr-4 bg-music-surface rounded-xl outline-none focus:ring-2 focus:ring-music-accent border border-white/5 smooth-transition"
                  placeholder="Search for artists, songs, albums..."
                />
              </div>
            </form>
          </section>
          
          {isSearching ? (
            <div className="flex justify-center py-20">
              <div className="wave-bars">
                <div className="animate-wave-1"></div>
                <div className="animate-wave-2"></div>
                <div className="animate-wave-3"></div>
                <div className="animate-wave-4"></div>
              </div>
            </div>
          ) : searchQuery && !hasResults ? (
            <div className="text-center py-20 animate-fade-in">
              <h3 className="text-xl font-medium mb-2">No results found for "{searchQuery}"</h3>
              <p className="text-music-subtle">Try searching for something else</p>
            </div>
          ) : hasResults ? (
            <div className="space-y-10 animate-fade-in">
              <SectionHeader 
                title={`Search results for "${searchQuery}"`} 
                description={`Found ${totalResults} results`}
              />
              
              {/* Track results */}
              {searchResults.tracks.length > 0 && (
                <section>
                  <h3 className="text-xl font-semibold mb-4">Songs</h3>
                  <div className="bg-music-surface/20 rounded-xl overflow-hidden">
                    <TrackList tracks={searchResults.tracks} />
                  </div>
                </section>
              )}
              
              {/* Album results */}
              {searchResults.albums.length > 0 && (
                <section>
                  <h3 className="text-xl font-semibold mb-4">Albums</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {searchResults.albums.map((album) => (
                      <AlbumCard 
                        key={album.id}
                        id={album.id}
                        title={album.title}
                        artist={album.artist}
                        cover={album.cover}
                      />
                    ))}
                  </div>
                </section>
              )}
              
              {/* Playlist results */}
              {searchResults.playlists.length > 0 && (
                <section>
                  <h3 className="text-xl font-semibold mb-4">Playlists</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {searchResults.playlists.map((playlist) => (
                      <AlbumCard 
                        key={playlist.id}
                        id={playlist.id}
                        title={playlist.title}
                        artist={playlist.owner}
                        cover={playlist.coverImage}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>
          ) : (
            <section className="animate-fade-in">
              <SectionHeader title="Browse categories" />
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {["Pop", "Hip-Hop", "Rock", "Electronic", "Jazz", "Classical", "R&B", "Indie"].map((category) => (
                  <div 
                    key={category}
                    className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer"
                  >
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-music-accent/80 to-music-primary opacity-80 group-hover:opacity-90 smooth-transition"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-xl font-bold text-white">{category}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Search;
