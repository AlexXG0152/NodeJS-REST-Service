import { IAlbum } from 'src/album/album.interface';
import { IArtist } from 'src/artist/artist.interface';
import { ITrack } from 'src/track/track.interface';

export interface IFavorites {
  // id: string;
  artist?: string[]; // favorite artists ids
  album?: string[]; // favorite albums ids
  track?: string[]; // favorite tracks ids
  // version: number; // integer number, increments on update
  // createdAt: number; // timestamp of creation
  // updatedAt: number; // timestamp of last update
}

export interface IFavoritesRepsonse {
  artist?: [];
  album?: [];
  track?: [];
}

export type sectionType = 'artist' | 'album' | 'track';
