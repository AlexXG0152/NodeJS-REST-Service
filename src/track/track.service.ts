import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';

import { ITrack } from './track.interface';
import { TrackDto } from './dto/track.dto';

const tracks: ITrack[] = [];
@Injectable({})
export class TrackService {
  async getTracks() {
    return tracks;
  }

  async getTrack(id: string) {
    await this.checkUUID(id);

    try {
      return await this.cheskIsTrackExists(id);
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
    await this.checkUUID(id);

    await this.cheskIsTrackExists(id);

    for (const track in tracks) {
      if (Object.prototype.hasOwnProperty.call(tracks, track)) {
        if (tracks[track].id === id) {
          tracks[track].name = data.name;
          tracks[track].artistId = data.artistId;
          tracks[track].albumId = data.albumId;
          tracks[track].duration = data.duration;
          tracks[track].version += 1;
          tracks[track].updatedAt = Date.now();

          return tracks[track];
        }
      }
    }
  }

  async updateManyTracksAfterArtistDelete(id: string) {
    console.log(id);
    console.log(tracks);

    for (const track in tracks) {
      if (Object.prototype.hasOwnProperty.call(tracks, track)) {
        if (tracks[track].artistId === id) {
          tracks[track].artistId = null;
          tracks[track].version += 1;
          tracks[track].updatedAt = Date.now();
        }
      }
    }
    console.log(tracks);
  }

  async deleteTrack(id: string) {
    await this.checkUUID(id);

    const trackIndex = tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (trackIndex > -1) {
      tracks.splice(trackIndex, 1);
    }
    return 'HttpStatus.NO_CONTENT';
  }

  async checkUUID(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  async cheskIsTrackExists(id: string) {
    const track = tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return track;
  }
}
