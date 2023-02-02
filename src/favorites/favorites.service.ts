import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { IFavoritesRepsonse } from './favorites.interface';
import { checkUUID } from 'src/helpers/checkers';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';

const favorites: IFavoritesRepsonse = { artists: [], albums: [], tracks: [] };

@Injectable()
export class FavoritesService {
  constructor(
    private albumService: AlbumService,
    private artistService: ArtistService,
    private trackService: TrackService,
  ) {}
  async getAllFavorites(): Promise<IFavoritesRepsonse> {
    // const data = {
    //   artists: await this.artistService.getArtists(),
    //   albums: await this.albumService.getAlbums(),
    //   tracks: await this.trackService.getTracks(),
    // };
    return favorites;
  }

  async addToToFavorites(id: string, section: string) {
    await checkUUID(id);
    switch (section) {
      case 'artist': {
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
      case 'album': {
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
      case 'track': {
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
        return;
    }
  }

  async deleteFavorites(id: string, section: string) {
    await checkUUID(id);
    switch (section) {
      case 'artist':
        await this.remove(id, 'artists');
        break;
      case 'album':
        await this.remove(id, 'albums');
        break;
      case 'track':
        await this.remove(id, 'tracks');
        break;
      default:
        return;
    }
  }

  async remove(id: string, from: string) {
    const index = favorites[from].findIndex((el) => el.id === id);

    if (index === -1) {
      throw new HttpException(
        'UNPROCESSABLE_ENTITY',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (index > -1) {
      favorites[from].splice(index, 1);
    }
  }
}
