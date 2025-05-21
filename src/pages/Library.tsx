
import React, { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import MusicPlayer from '@/components/layout/MusicPlayer';
import SectionHeader from '@/components/ui/SectionHeader';
import TrackList from '@/components/ui/TrackList';
import AlbumCard from '@/components/ui/AlbumCard';
import { getUserPlaylists, getAlbumsByGenre, getTracks, Album, Playlist, Track } from '@/lib/api';

const Library = () => {
  const [activeTab, setActiveTab] = useState('playlists');
  const [isLoading, setIsLoading] = useState(true);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  
  useEffect(() => {
    const fetchLibraryData = async () => {
      setIsLoading(true);
      
      try {
        // Fetch data based on active tab
        if (activeTab === 'playlists') {
          const playlistsData = await getUserPlaylists();
          setPlaylists(playlistsData);
        } else if (activeTab === 'albums') {
          const albumsData = await getAlbumsByGenre();
          setAlbums(albumsData);
        } else if (activeTab === 'songs') {
          const tracksData = await getTracks('playlist', 'library_all_songs');
          setTracks(tracksData);
        }
      } catch (error) {
        console.error("Error fetching library data:", error);
        toast({
          title: "Error",
          description: "Failed to load your library",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLibraryData();
  }, [activeTab]);
  
  const tabs = [
    { id: 'playlists', label: 'Playlists' },
    { id: 'albums', label: 'Albums' },
    { id: 'artists', label: 'Artists' },
    { id: 'songs', label: 'Songs' },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-music-primary to-music-background text-music-text">
      <Sidebar />
      <TopBar />
      
      <main className="pt-4 pb-24 pl-64">
        <div className="max-w-screen-2xl mx-auto px-8">
          <section className="mb-8 animate-slide-in">
            <SectionHeader 
              title="Your Library" 
              description="Manage your music collection"
            />
            
            <div className="flex items-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-music-accent text-white"
                      : "bg-music-surface text-music-subtle hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </section>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="wave-bars">
                <div className="animate-wave-1"></div>
                <div className="animate-wave-2"></div>
                <div className="animate-wave-3"></div>
                <div className="animate-wave-4"></div>
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'playlists' && (
                <section className="animate-fade-in">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {playlists.map((playlist) => (
                      <AlbumCard
                        key={playlist.id}
                        id={playlist.id}
                        title={playlist.title}
                        artist={playlist.owner === "You" ? "Your Playlist" : playlist.owner}
                        cover={playlist.coverImage}
                      />
                    ))}
                    <div className="flex flex-col items-center justify-center p-8 rounded-md border border-white/5 bg-music-surface/30 hover:bg-music-surface/50 smooth-transition cursor-pointer">
                      <span className="text-music-subtle">Create Playlist</span>
                    </div>
                  </div>
                </section>
              )}
              
              {activeTab === 'albums' && (
                <section className="animate-fade-in">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {albums.map((album) => (
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
              
              {activeTab === 'artists' && (
                <section className="animate-fade-in">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {["Noir Dreams", "Luna Echo", "Solar Flare", "Cyber Pulse", "Metro Vibes", "Harmony Woods"].map((artist, index) => (
                      <div key={artist} className="text-center">
                        <div className="relative mx-auto rounded-full overflow-hidden aspect-square w-full max-w-[180px] mb-4">
                          <img 
                            src={albums[index % albums.length]?.cover || "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500"}
                            alt={artist}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-medium text-sm">{artist}</h3>
                        <p className="text-xs text-music-subtle mt-1">Artist</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              
              {activeTab === 'songs' && (
                <section className="animate-fade-in">
                  <div className="bg-music-surface/20 rounded-xl overflow-hidden">
                    <TrackList tracks={tracks} />
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Library;
