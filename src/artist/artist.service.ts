import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { IArtist } from './artist.interface';
import { ArtistDto } from './dto/artist.dto';
import { TrackService } from '../track/track.service';
import { checkUUID, cheskIsExists } from 'src/helpers/checkers';

@Injectable()
export class ArtistService {
  constructor(private trackService: TrackService) {}

  private artists: IArtist[] = [];

  async getArtists() {
    return this.artists;
  }

  async getArtist(id: string) {
    await checkUUID(id);

    try {
      return await cheskIsExists(id, this.artists);
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

      this.artists.push({ ...artist, ...dbServiceInfo });

      return { ...artist, ...dbServiceInfo };
    } catch (error) {}
  }

  async updateArtist(id: string, data: ArtistDto) {
    await checkUUID(id);

    await cheskIsExists(id, this.artists);

    for (const artist in this.artists) {
      if (Object.prototype.hasOwnProperty.call(this.artists, artist)) {
        if (this.artists[artist].id === id) {
          this.artists[artist].name = data.name;
          this.artists[artist].grammy = data.grammy;

          return this.artists[artist];
        }
      }
    }
  }

  async deleteArtist(id: string) {
    await checkUUID(id);
    await this.trackService.updateManyTracksAfterDelete(id, 'artist');

    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (artistIndex > -1) {
      this.artists.splice(artistIndex, 1);
    }

    return 'HttpStatus.NO_CONTENT';
  }
}
