export interface IAlbum {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}
