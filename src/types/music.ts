// types/music.ts
export interface Track {
    id: string;
    title: string;
    artist: string;
    album: string;
    albumCover: string;
    audioUrl: string;
    duration: string;
    thumbnail: string;
    videoId:string
    
  }
  export interface TrackListProps {
    tracks: Track[];
    onPlay?: (track: Track) => void;
  }