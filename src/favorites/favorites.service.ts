import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';

import { IFavoritesRepsonse, sectionType } from './favorites.interface';
import { checkUUID } from 'src/helpers/checkers';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';

export const favorites: IFavoritesRepsonse = {
  artists: [],
  albums: [],
  tracks: [],
};

@Injectable({})
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}
  async getAllFavorites(): Promise<IFavoritesRepsonse> {
    return favorites;
  }

  async addToFavorites(id: string, section: sectionType) {
    await checkUUID(id);
    switch (section) {
      case 'artists': {
        try {
          const artist = await this.artistService.getArtist(id);
          const { createdAt, updatedAt, version, ...result } = artist;
          favorites.artists.push(result);
          break;
        } catch (error) {
          throw new HttpException(
            'UNPROCESSABLE_ENTITY',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
      }
      case 'albums': {
        try {
          const album = await this.albumService.getAlbum(id);
          const { createdAt, updatedAt, version, ...result } = album;
          favorites.albums.push(result);
          break;
        } catch (error) {
          throw new HttpException(
            'UNPROCESSABLE_ENTITY',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
      }
      case 'tracks': {
        try {
          const track = await this.trackService.getTrack(id);
          const { createdAt, updatedAt, version, ...result } = track;
          favorites.tracks.push(result);
          break;
        } catch (error) {
          throw new HttpException(
            'UNPROCESSABLE_ENTITY',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
      }
      default:
        const unknownSection: never = section;
        throw new Error(`Unknown section ${unknownSection}`);
    }
  }

  async deleteFromFavorites(id: string, section: sectionType) {
    await checkUUID(id);
    switch (section) {
      case 'artists':
        await this.remove(id, 'artists');
        break;
      case 'albums':
        await this.remove(id, 'albums');
        break;
      case 'tracks':
        await this.remove(id, 'tracks');
        break;
      default:
        const unknownSection: never = section;
        throw new Error(`Unknown section ${unknownSection}`);
    }
  }

  async remove(id: string, section: string) {
    const index = favorites[section].findIndex((el) => el.id === id);

    if (index === -1) {
      throw new HttpException(
        'UNPROCESSABLE_ENTITY',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (index > -1) {
      favorites[section].splice(index, 1);
    }
  }
}
