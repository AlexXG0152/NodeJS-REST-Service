export interface ITrack {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}
