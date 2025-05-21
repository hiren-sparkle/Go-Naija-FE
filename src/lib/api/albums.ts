
import { toast } from "@/components/ui/use-toast";
import { Album } from "./types";
import { simulateRequest } from "./utils";

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
