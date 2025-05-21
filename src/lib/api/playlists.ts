
import { toast } from "@/components/ui/use-toast";
import { Playlist } from "./types";
import { simulateRequest } from "./utils";

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
