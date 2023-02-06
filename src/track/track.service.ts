import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { ITrack } from './track.interface';
import { TrackDto } from './dto/track.dto';
import { checkUUID, cheskIsExists } from 'src/helpers/checkers';
import { FavoritesService } from 'src/favorites/favorites.service';

export const tracks: ITrack[] = [];

@Injectable({})
export class TrackService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  async getTracks() {
    return tracks;
  }

  async getTrack(id: string) {
    await checkUUID(id);

    try {
      return await cheskIsExists(id, tracks);
    } catch (error) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }
  async createTrack(track: TrackDto) {
    try {
      const dbServiceInfo = {
        id: uuidv4(),
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      tracks.push({ ...track, ...dbServiceInfo });

      return { ...track, ...dbServiceInfo };
    } catch (error) {}
  }

  async updateTrack(id: string, data: TrackDto) {
    await checkUUID(id);

    await cheskIsExists(id, tracks);

    for (const track in tracks) {
      if (Object.prototype.hasOwnProperty.call(tracks, track)) {
        if (tracks[track].id === id) {
          tracks[track].name = data.name;
          tracks[track].artistId = data.artistId;
          tracks[track].albumId = data.albumId;
          tracks[track].duration = data.duration;
          tracks[track].updatedAt = Date.now();

          return tracks[track];
        }
      }
    }
  }

  async updateManyTracksAfterDelete(id: string, type: string) {
    for (const element in tracks) {
      if (Object.prototype.hasOwnProperty.call(tracks, element)) {
        if (type === 'artist') {
          if (tracks[element].artistId === id) {
            tracks[element].artistId = null;
          }
        } else if (type === 'album') {
          if (tracks[element].albumId === id) {
            tracks[element].albumId = null;
          }
        }
        tracks[element].updatedAt = Date.now();
      }
    }
  }

  async deleteTrack(id: string) {
    await checkUUID(id);
    try {
      await this.favoritesService.deleteFromFavorites(id, 'tracks');
    } catch (error) {}

    const trackIndex = tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (trackIndex > -1) {
      tracks.splice(trackIndex, 1);
    }
    return 'HttpStatus.NO_CONTENT';
  }
}
