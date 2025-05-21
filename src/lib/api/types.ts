
// Types for YouTube Music API responses
export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  albumCover: string;
  audioUrl: string;
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

export interface FeaturedContent {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  type: "playlist" | "album";
  tracks?: number;
}

export interface SearchResults {
  tracks: Track[];
  albums: Album[];
  playlists: Playlist[];
}
