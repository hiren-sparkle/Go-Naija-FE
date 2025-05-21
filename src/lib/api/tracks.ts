
import { toast } from "@/components/ui/use-toast";
import { Track } from "./types";
import { simulateRequest, AUDIO_SAMPLES } from "./utils";

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
