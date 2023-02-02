import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

export interface IArtistDto {
  name: string;
  grammy: boolean;
}

export class ArtistDto implements IArtistDto {
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
