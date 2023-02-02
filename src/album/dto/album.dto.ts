import { IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

export interface IAlbumDto {
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export class AlbumDto implements IAlbumDto {
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Min(0)
  @IsNotEmpty()
  year: number;

  artistId: string | null;
}
