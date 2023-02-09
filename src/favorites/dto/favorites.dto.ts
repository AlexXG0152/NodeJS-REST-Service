import { IsArray, IsString } from 'class-validator';

export interface IFavoritesDto {
  // id: string;
  artists?: string[]; // favorite artists ids
  albums?: string[]; // favorite albums ids
  tracks?: string[]; // favorite tracks ids
}

export class FavoritesDto implements IFavoritesDto {
  // @IsString()
  // id: string;
  @IsArray()
  artists: string[];
  @IsArray()
  albums: string[];
  @IsArray()
  tracks: string[];
}
