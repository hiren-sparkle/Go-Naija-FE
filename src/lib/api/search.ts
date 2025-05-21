
import { toast } from "@/components/ui/use-toast";
import { Album, Playlist, Track, SearchResults } from "./types";
import { simulateRequest } from "./utils";
import { getAlbumsByGenre } from "./albums";
import { getUserPlaylists } from "./playlists";
import { getTracks } from "./tracks";

// Search for content
export const searchContent = async (query: string): Promise<SearchResults> => {
  try {
    if (!query.trim()) {
      return { tracks: [], albums: [], playlists: [] };
    }
    
    // Get all available content
    const [allAlbums, allPlaylists] = await Promise.all([
      getAlbumsByGenre(),
      getUserPlaylists()
    ]);
    
    // Example tracks data
    const allTracks = await getTracks('album', 'search');
    
    // Filter content based on query
    const filteredTracks = allTracks.filter(track => 
      track.title.toLowerCase().includes(query.toLowerCase()) ||
      track.artist.toLowerCase().includes(query.toLowerCase()) ||
      track.album.toLowerCase().includes(query.toLowerCase())
    );
    
    const filteredAlbums = allAlbums.filter(album => 
      album.title.toLowerCase().includes(query.toLowerCase()) ||
      album.artist.toLowerCase().includes(query.toLowerCase())
    );
    
    const filteredPlaylists = allPlaylists.filter(playlist => 
      playlist.title.toLowerCase().includes(query.toLowerCase()) ||
      playlist.description?.toLowerCase().includes(query.toLowerCase())
    );
    
    return await simulateRequest({
      tracks: filteredTracks,
      albums: filteredAlbums,
      playlists: filteredPlaylists
    });
  } catch (error) {
    console.error("Error searching content:", error);
    toast({
      title: "Error",
      description: "Search failed. Please try again.",
      variant: "destructive"
    });
    return { tracks: [], albums: [], playlists: [] };
  }
};
