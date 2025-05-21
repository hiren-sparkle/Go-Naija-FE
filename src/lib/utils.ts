
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Music related mock data
export const genres = [
  "All", "Hip-Hop", "Electronic", "Pop", "Rock", "R&B", "Jazz", "Classical", "Indie","American"
];

export const mockAlbums = [
  {
    id: "1",
    title: "Midnight Memories",
    artist: "Noir Dreams",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D",
    genre: "Electronic",
    tracks: 12
  },
  {
    id: "2",
    title: "Velvet Sky",
    artist: "Luna Echo",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXVzaWN8ZW58MHx8MHx8fDA%3D",
    genre: "Pop",
    tracks: 10
  },
  {
    id: "3",
    title: "Golden Hour",
    artist: "Solar Flare",
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG11c2ljfGVufDB8fDB8fHww",
    genre: "Indie",
    tracks: 8
  },
  {
    id: "4",
    title: "Neon Nights",
    artist: "Cyber Pulse",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG11c2ljfGVufDB8fDB8fHww",
    genre: "Electronic",
    tracks: 14
  },
  {
    id: "5",
    title: "Urban Echoes",
    artist: "Metro Vibes",
    cover: "https://images.unsplash.com/photo-1577375729152-4c8b5fcda381?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG11c2ljfGVufDB8fDB8fHww",
    genre: "Hip-Hop",
    tracks: 16
  },
  {
    id: "6",
    title: "Acoustic Dreams",
    artist: "Harmony Woods",
    cover: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG11c2ljfGVufDB8fDB8fHww",
    genre: "Indie",
    tracks: 9
  },
];

export const mockFeatured = {
  id: "featured1",
  title: "Discover Weekly",
  description: "Your personal playlist with fresh discoveries and deep cuts chosen just for you. Updated every Monday.",
  coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG11c2ljfGVufDB8fDB8fHww",
  type: "playlist",
  tracks: 30
};

export const mockTracks = [
  {
    id: "track1",
    title: "Electric Dreams",
    artist: "Cyber Pulse",
    album: "Neon Nights",
    duration: "3:45",
    albumCover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG11c2ljfGVufDB8fDB8fHww"
  },
  {
    id: "track2",
    title: "Midnight Serenade",
    artist: "Luna Echo",
    album: "Velvet Sky",
    duration: "4:12",
    albumCover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXVzaWN8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: "track3",
    title: "Urban Flow",
    artist: "Metro Vibes",
    album: "Urban Echoes",
    duration: "3:21",
    albumCover: "https://images.unsplash.com/photo-1577375729152-4c8b5fcda381?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG11c2ljfGVufDB8fDB8fHww"
  },
  {
    id: "track4",
    title: "Golden Sunset",
    artist: "Solar Flare",
    album: "Golden Hour",
    duration: "5:18",
    albumCover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG11c2ljfGVufDB8fDB8fHww"
  },
  {
    id: "track5",
    title: "Woodland Echoes",
    artist: "Harmony Woods",
    album: "Acoustic Dreams",
    duration: "3:56",
    albumCover: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG11c2ljfGVufDB8fDB8fHww"
  },
  {
    id: "track6",
    title: "After Dark",
    artist: "Noir Dreams",
    album: "Midnight Memories",
    duration: "4:32",
    albumCover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D"
  },
];

export const mockNewReleases = [
  {
    id: "7",
    title: "Future Memories",
    artist: "Digital Dreamers",
    cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVzaWN8ZW58MHx8MHx8fDA%3D",
    genre: "Electronic",
    tracks: 11
  },
  {
    id: "8",
    title: "Ocean Waves",
    artist: "Coastal Sounds",
    cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG11c2ljfGVufDB8fDB8fHww",
    genre: "Ambient",
    tracks: 8
  },
  {
    id: "9",
    title: "Metropolis",
    artist: "Urban Symphony",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fG11c2ljfGVufDB8fDB8fHww",
    genre: "Classical",
    tracks: 14
  }
];

export const mockRecommended = [
  {
    id: "10",
    title: "Jazz Nights",
    artist: "Smooth Quartet",
    cover: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fG11c2ljfGVufDB8fDB8fHww",
    genre: "Jazz",
    tracks: 12
  },
  {
    id: "11",
    title: "Electric Soul",
    artist: "Voltage Vibes",
    cover: "https://images.unsplash.com/photo-1461784180009-27c1303a64c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fG11c2ljfGVufDB8fDB8fHww",
    genre: "Electronic",
    tracks: 10
  },
  {
    id: "12",
    title: "Acoustic Journey",
    artist: "Folk Tales",
    cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fG11c2ljfGVufDB8fDB8fHww",
    genre: "Folk",
    tracks: 9
  }
];
