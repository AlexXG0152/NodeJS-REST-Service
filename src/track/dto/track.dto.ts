import { IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

export interface ITrackDto {
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export class TrackDto implements ITrackDto {
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  name: string;

  artistId: string;
  albumId: string;

  @Min(0)
  @IsNotEmpty()
  duration: number;
}
