import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ArtistDto } from './dto/artist.dto';
import { checkUUID, cheskIsExists } from 'src/helpers/checkers';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async getArtists() {
    try {
      return await this.prisma.artist.findMany();
    } catch (error) {}
  }

  async getArtist(id: string) {
    await checkUUID(id);
    try {
      return await cheskIsExists(id, this.prisma.artist);
    } catch (error) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }
  async createArtist(artist: ArtistDto) {
    try {
      return await this.prisma.artist.create({ data: artist });
    } catch (error) {}
  }

  async updateArtist(id: string, data: ArtistDto) {
    await checkUUID(id);
    await cheskIsExists(id, this.prisma.artist);
    try {
      await cheskIsExists(id, this.prisma.artist);
      return await this.prisma.artist.update({
        where: { id },
        data: data,
      });
    } catch (error) {}
  }

  async deleteArtist(id: string) {
    await checkUUID(id);
    await cheskIsExists(id, this.prisma.artist);

    const artistData = await cheskIsExists(id, this.prisma.artist);

    try {
      await this.prisma.artist.delete({ where: { id } });
      await this.prisma.track.updateMany({
        where: { artistId: artistData.id },
        data: {
          artistId: null,
        },
      });
    } catch (error) {}
  }
}
