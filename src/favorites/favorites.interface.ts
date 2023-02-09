export interface IFavorites {
  artist?: string[]; // favorite artists ids
  album?: string[]; // favorite albums ids
  track?: string[]; // favorite tracks ids
}

export interface IFavoritesRepsonse {
  artist?: [];
  album?: [];
  track?: [];
}

export type sectionType = 'artist' | 'album' | 'track';
