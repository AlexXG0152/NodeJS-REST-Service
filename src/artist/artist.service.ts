import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { IArtist } from './artist.interface';
import { ArtistDto } from './dto/artist.dto';
import { TrackService } from '../track/track.service';
import { checkUUID, cheskIsExists } from 'src/helpers/checkers';

const artists: IArtist[] = [];

@Injectable()
export class ArtistService {
  constructor(private trackService: TrackService) {}

  async getArtists() {
    return artists;
  }

  async getArtist(id: string) {
    await checkUUID(id);

    try {
      return await cheskIsExists(id, artists);
    } catch (error) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }
  async createArtist(artist: ArtistDto) {
    try {
      const dbServiceInfo = {
        id: uuidv4(),
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      artists.push({ ...artist, ...dbServiceInfo });

      return { ...artist, ...dbServiceInfo };
    } catch (error) {}
  }

  async updateArtist(id: string, data: ArtistDto) {
    await checkUUID(id);

    await cheskIsExists(id, artists);

    for (const artist in artists) {
      if (Object.prototype.hasOwnProperty.call(artists, artist)) {
        if (artists[artist].id === id) {
          artists[artist].name = data.name;
          artists[artist].grammy = data.grammy;

          return artists[artist];
        }
      }
    }
  }

  async deleteArtist(id: string) {
    await checkUUID(id);
    await this.trackService.updateManyTracksAfterDelete(id, 'artist');

    const artistIndex = artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (artistIndex > -1) {
      artists.splice(artistIndex, 1);
    }

    return 'HttpStatus.NO_CONTENT';
  }
}
