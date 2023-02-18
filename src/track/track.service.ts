import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ITrack } from './track.interface';
import { TrackDto } from './dto/track.dto';
import { checkUUID, cheskIsExists } from 'src/helpers/checkers';
import { PrismaService } from 'src/prisma/prisma.service';

export const tracks: ITrack[] = [];

@Injectable({})
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async getTracks() {
    try {
      return await this.prisma.track.findMany();
    } catch (error) {}
  }

  async getTrack(id: string) {
    await checkUUID(id);
    try {
      return await cheskIsExists(id, this.prisma.track);
    } catch (error) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }

  async createTrack(data: TrackDto) {
    try {
      return await this.prisma.track.create({ data });
    } catch (error) {}
  }

  async updateTrack(id: string, data: TrackDto) {
    await checkUUID(id);
    await cheskIsExists(id, this.prisma.track);
    try {
      return await this.prisma.track.update({
        where: { id },
        data: {
          name: data.name,
          artistId: data?.artistId,
          albumId: data?.albumId,
          duration: data.duration,
        },
      });
    } catch (error) {}
  }

  async deleteTrack(id: string) {
    await checkUUID(id);
    await cheskIsExists(id, this.prisma.track);
    try {
      return await this.prisma.track.delete({ where: { id } });
    } catch (error) {}
  }
}
