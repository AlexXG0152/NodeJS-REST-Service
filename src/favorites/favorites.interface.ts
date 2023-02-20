export interface IFavorites {
  artists?: string[]; // favorite artists ids
  albums?: string[]; // favorite albums ids
  tracks?: string[]; // favorite tracks ids
}

export interface IFavoritesRepsonse {
  artists?: [];
  albums?: [];
  tracks?: [];
}

export type sectionType = 'artists' | 'albums' | 'tracks';
