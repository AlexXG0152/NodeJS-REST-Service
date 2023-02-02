import { IAlbum } from 'src/album/album.interface';
import { IArtist } from 'src/artist/artist.interface';
import { ITrack } from 'src/track/track.interface';

export interface IFavorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface IFavoritesRepsonse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
