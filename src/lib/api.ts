
import { toast } from "@/components/ui/use-toast";

// Types for YouTube Music API responses
export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  albumCover: string;
  audioUrl: string; // Added audio URL field
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  cover: string;
  genre?: string;
  tracks: number;
  year?: string;
}

export interface Playlist {
  id: string;
  title: string;
  description?: string;
  coverImage: string;
  trackCount: number;
  owner: string;
}

// Mock audio URLs for our tracks
// In a real app, these would be fetched from a real API
const AUDIO_SAMPLES = [
  "/audio/sample1.mp3",
  "/audio/sample2.mp3",
  "/audio/sample3.mp3",
  "/audio/sample4.mp3",
  "/audio/sample5.mp3"
];

// Simulate API request delay and potential failures
const simulateRequest = async <T>(data: T): Promise<T> => {
  // Add random delay between 300-800ms to simulate network request
  const delay = Math.floor(Math.random() * 500) + 300;
  await new Promise(resolve => setTimeout(resolve, delay));

  // Randomly fail 5% of requests to simulate network issues
  if (Math.random() < 0.05) {
    throw new Error("Network request failed");
  }

  return data;
};

// Get featured content
export const getFeaturedContent = async (): Promise<{
  title: string;
  description: string;
  coverImage: string;
  type: "playlist" | "album";
}> => {
  try {
    const featuredContent = {
      id: "featured1",
      title: "This Week's Hits",
      description: "The biggest songs of the week, updated every Friday with new releases.",
      coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG11c2ljfGVufDB8fDB8fHww",
      type: "playlist" as const,
      tracks: 50
    };

    return await simulateRequest(featuredContent);
  } catch (error) {
    console.error("Error fetching featured content:", error);
    toast({
      title: "Error",
      description: "Failed to load featured content",
      variant: "destructive"
    });

    // Return fallback data
    return {
      title: "Discover Weekly",
      description: "Your personal playlist with fresh discoveries and deep cuts chosen just for you. Updated every Monday.",
      coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG11c2ljfGVufDB8fDB8fHww",
      type: "playlist" as const
    };
  }
};

// Get albums by genre
export const getAlbumsByGenre = async (genre?: string): Promise<Album[]> => {
  try {
    const allAlbums = [
      {
        id: "yt_album_1",
        title: "After Hours",
        artist: "The Weeknd",
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D",
        genre: "Pop",
        tracks: 14,
        year: "2020"
      },
      {
        id: "yt_album_2",
        title: "Future Nostalgia",
        artist: "Dua Lipa",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXVzaWN8ZW58MHx8MHx8fDA%3D",
        genre: "Pop",
        tracks: 11,
        year: "2020"
      },
      {
        id: "yt_album_3",
        title: "good kid, m.A.A.d city",
        artist: "Kendrick Lamar",
        cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG11c2ljfGVufDB8fDB8fHww",
        genre: "Hip-Hop",
        tracks: 12,
        year: "2012"
      },
      {
        id: "yt_album_4",
        title: "Random Access Memories",
        artist: "Daft Punk",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG11c2ljfGVufDB8fDB8fHww",
        genre: "Electronic",
        tracks: 13,
        year: "2013"
      },
      {
        id: "yt_album_5",
        title: "To Pimp A Butterfly",
        artist: "Kendrick Lamar",
        cover: "https://images.unsplash.com/photo-1577375729152-4c8b5fcda381?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG11c2ljfGVufDB8fDB8fHww",
        genre: "Hip-Hop",
        tracks: 16,
        year: "2015"
      },
      {
        id: "yt_album_6",
        title: "Rumours",
        artist: "Fleetwood Mac",
        cover: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG11c2ljfGVufDB8fDB8fHww",
        genre: "Rock",
        tracks: 11,
        year: "1977"
      },
      {
        id: "yt_album_7",
        title: "Blonde",
        artist: "Frank Ocean",
        cover: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fG11c2ljfGVufDB8fDB8fHww",
        genre: "R&B",
        tracks: 17,
        year: "2016"
      },
      {
        id: "yt_album_8",
        title: "The Dark Side of the Moon",
        artist: "Pink Floyd",
        cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVzaWN8ZW58MHx8MHx8fDA%3D",
        genre: "Rock",
        tracks: 10,
        year: "1973"
      },
    ] as Album[];

    // Filter by genre if specified
    const filteredAlbums = genre && genre !== "All"
      ? allAlbums.filter(album => album.genre === genre)
      : allAlbums;

    return await simulateRequest(filteredAlbums);
  } catch (error) {
    console.error("Error fetching albums:", error);
    toast({
      title: "Error",
      description: "Failed to load albums",
      variant: "destructive"
    });
    return [];
  }
};

// Get new releases
export const getNewReleases = async (): Promise<Album[]> => {
  try {
    const newReleases = [
      {
        id: "yt_new_1",
        title: "Happier Than Ever",
        artist: "Billie Eilish",
        cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVzaWN8ZW58MHx8MHx8fDA%3D",
        genre: "Pop",
        tracks: 16,
        year: "2023"
      },
      {
        id: "yt_new_2",
        title: "Hyperspace",
        artist: "Beck",
        cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG11c2ljfGVufDB8fDB8fHww",
        genre: "Alternative",
        tracks: 11,
        year: "2023"
      },
      {
        id: "yt_new_3",
        title: "Inner Child",
        artist: "Aurora Lights",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fG11c2ljfGVufDB8fDB8fHww",
        genre: "Indie",
        tracks: 14,
        year: "2023"
      }
    ] as Album[];

    return await simulateRequest(newReleases);
  } catch (error) {
    console.error("Error fetching new releases:", error);
    toast({
      title: "Error",
      description: "Failed to load new releases",
      variant: "destructive"
    });
    return [];
  }
};

// Get recommended albums
export const getRecommendedAlbums = async (): Promise<Album[]> => {
  try {
    const recommendedAlbums = [
      {
        id: "yt_rec_1",
        title: "Blue Note Sessions",
        artist: "Modern Jazz Quartet",
        cover: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fG11c2ljfGVufDB8fDB8fHww",
        genre: "Jazz",
        tracks: 12,
        year: "2022"
      },
      {
        id: "yt_rec_2",
        title: "Synthwave Dreams",
        artist: "Digital Pulse",
        cover: "https://images.unsplash.com/photo-1461784180009-27c1303a64c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fG11c2ljfGVufDB8fDB8fHww",
        genre: "Electronic",
        tracks: 10,
        year: "2021"
      },
      {
        id: "yt_rec_3",
        title: "Mountain Songs",
        artist: "Forest Echo",
        cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fG11c2ljfGVufDB8fDB8fHww",
        genre: "Folk",
        tracks: 9,
        year: "2022"
      },
      {
        id: "yt_rec_4",
        title: "Urban Stories",
        artist: "City Beat Collective",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG11c2ljfGVufDB8fDB8fHww",
        genre: "Hip-Hop",
        tracks: 14,
        year: "2022"
      },
    ] as Album[];

    return await simulateRequest(recommendedAlbums);
  } catch (error) {
    console.error("Error fetching recommended albums:", error);
    toast({
      title: "Error",
      description: "Failed to load recommendations",
      variant: "destructive"
    });
    return [];
  }
};

// Get playlists
export const getUserPlaylists = async (): Promise<Playlist[]> => {
  try {
    const userPlaylists = [
      {
        id: "yt_playlist_1",
        title: "Chill Vibes",
        description: "Relaxing tracks for your downtime",
        coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXVzaWN8ZW58MHx8MHx8fDA%3D",
        trackCount: 42,
        owner: "You"
      },
      {
        id: "yt_playlist_2",
        title: "Workout Mix",
        description: "High energy tracks to keep you motivated",
        coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D",
        trackCount: 28,
        owner: "You"
      },
      {
        id: "yt_playlist_3",
        title: "Focus Playlist",
        description: "Concentration-enhancing tracks",
        coverImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG11c2ljfGVufDB8fDB8fHww",
        trackCount: 35,
        owner: "You"
      },
      {
        id: "yt_playlist_4",
        title: "Party Beats",
        description: "Get the party started",
        coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG11c2ljfGVufDB8fDB8fHww",
        trackCount: 50,
        owner: "You"
      },
      {
        id: "yt_playlist_5",
        title: "Road Trip",
        description: "Songs for the open road",
        coverImage: "https://images.unsplash.com/photo-1577375729152-4c8b5fcda381?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG11c2ljfGVufDB8fDB8fHww",
        trackCount: 63,
        owner: "You"
      },
    ] as Playlist[];

    return await simulateRequest(userPlaylists);
  } catch (error) {
    console.error("Error fetching playlists:", error);
    toast({
      title: "Error",
      description: "Failed to load playlists",
      variant: "destructive"
    });
    return [];
  }
};

// Get tracks for an album or playlist
export const getTracks = async (type: 'album' | 'playlist', id: string): Promise<Track[]> => {
  try {
    // Simulate tracks based on the id provided
    const tracks = [
      {
        id: `${id}_track_1`,
        title: "Electric Dreams",
        artist: "Cyber Pulse",
        album: "Neon Nights",
        duration: "3:45",
        albumCover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG11c2ljfGVufDB8fDB8fHww",
        audioUrl: AUDIO_SAMPLES[0]
      },
      {
        id: `${id}_track_2`,
        title: "Midnight Serenade",
        artist: "Luna Echo",
        album: "Velvet Sky",
        duration: "4:12",
        albumCover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXVzaWN8ZW58MHx8MHx8fDA%3D",
        audioUrl: AUDIO_SAMPLES[1]
      },
      {
        id: `${id}_track_3`,
        title: "Urban Flow",
        artist: "Metro Vibes",
        album: "Urban Echoes",
        duration: "3:21",
        albumCover: "https://images.unsplash.com/photo-1577375729152-4c8b5fcda381?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG11c2ljfGVufDB8fDB8fHww",
        audioUrl: AUDIO_SAMPLES[2]
      },
      {
        id: `${id}_track_4`,
        title: "Golden Sunset",
        artist: "Solar Flare",
        album: "Golden Hour",
        duration: "5:18",
        albumCover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG11c2ljfGVufDB8fDB8fHww",
        audioUrl: AUDIO_SAMPLES[3]
      },
      {
        id: `${id}_track_5`,
        title: "Woodland Echoes",
        artist: "Harmony Woods",
        album: "Acoustic Dreams",
        duration: "3:56",
        albumCover: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG11c2ljfGVufDB8fDB8fHww",
        audioUrl: AUDIO_SAMPLES[4]
      },
      {
        id: `${id}_track_6`,
        title: "After Dark",
        artist: "Noir Dreams",
        album: "Midnight Memories",
        duration: "4:32",
        albumCover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D",
        audioUrl: AUDIO_SAMPLES[0]
      },
      {
        id: `${id}_track_7`,
        title: "Digital Love",
        artist: "Electronic Dreams",
        album: "Neon City",
        duration: "3:15",
        albumCover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVzaWN8ZW58MHx8MHx8fDA%3D",
        audioUrl: AUDIO_SAMPLES[1]
      },
      {
        id: `${id}_track_8`,
        title: "Ocean Waves",
        artist: "Coastal Sounds",
        album: "Beach Day",
        duration: "6:08",
        albumCover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG11c2ljfGVufDB8fDB8fHww",
        audioUrl: AUDIO_SAMPLES[2]
      },
    ] as Track[];

    return await simulateRequest(tracks);
  } catch (error) {
    console.error(`Error fetching tracks for ${type} ${id}:`, error);
    toast({
      title: "Error",
      description: `Failed to load tracks for this ${type}`,
      variant: "destructive"
    });
    return [];
  }
};

// Search for content
export const searchContent = async (query: string): Promise<{
  tracks: Track[];
  albums: Album[];
  playlists: Playlist[];
}> => {
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

