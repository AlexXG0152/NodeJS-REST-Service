import { IsArray } from 'class-validator';

export interface IFavoritesDto {
  artists?: string[]; // favorite artists ids
  albums?: string[]; // favorite albums ids
  tracks?: string[]; // favorite tracks ids
}

export class FavoritesDto implements IFavoritesDto {
  @IsArray()
  artists: string[];
  @IsArray()
  albums: string[];
  @IsArray()
  tracks: string[];
}
