import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';

import { ITrack } from './track.interface';
import { TrackDto } from './dto/track.dto';

@Injectable({})
export class TrackService {
  private tracks: ITrack[] = [];

  async getTracks() {
    return this.tracks;
  }

  async getTrack(id: string) {
    await this.checkUUID(id);

    try {
      await this.cheskIsTrackExists(id);
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

      this.tracks.push({ ...track, ...dbServiceInfo });

      return { ...track, ...dbServiceInfo };
    } catch (error) {}
  }

  async updateTrack(id: string, data: TrackDto) {
    await this.checkUUID(id);

    await this.cheskIsTrackExists(id);

    for (const track in this.tracks) {
      if (Object.prototype.hasOwnProperty.call(this.tracks, track)) {
        if (this.tracks[track].id === id) {
          //   if (this.tracks[track].password === data.newPassword) {
          //     throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
          //   }
          this.tracks[track].name = data.name;
          this.tracks[track].artistId = data.artistId;
          this.tracks[track].albumId = data.albumId;
          this.tracks[track].duration = data.duration;
          this.tracks[track].version += 1;
          this.tracks[track].updatedAt = Date.now();

          //   const { password, ...rest } = this.tracks[user];
          return this.tracks[track];
        }
      }
    }
  }

  async deleteTrack(id: string) {
    await this.checkUUID(id);

    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (trackIndex > -1) {
      this.tracks.splice(trackIndex, 1);
    }
    return 'HttpStatus.NO_CONTENT';
  }

  async checkUUID(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  async cheskIsTrackExists(id: string) {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return track;
  }
}
