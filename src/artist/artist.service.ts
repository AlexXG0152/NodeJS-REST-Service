import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
// import { v4 as uuidv4 } from 'uuid';

import { IArtist } from './artist.interface';
import { ArtistDto } from './dto/artist.dto';
import { TrackService } from '../track/track.service';
import { checkUUID, cheskIsExists } from 'src/helpers/checkers';
import { FavoritesService } from 'src/favorites/favorites.service';
import { PrismaService } from 'src/prisma/prisma.service';

const artists: IArtist[] = [];

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    // @Inject(forwardRef(() => PrismaService))
    private prisma: PrismaService,
  ) {}

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
      // const dbServiceInfo = {
      //   id: uuidv4(),
      //   version: 1,
      //   createdAt: Date.now(),
      //   updatedAt: Date.now(),
      // };

      // artists.push({ ...artist, ...dbServiceInfo });

      // return { ...artist, ...dbServiceInfo };
      return await this.prisma.artist.create({ data: artist });
    } catch (error) {}
  }

  async updateArtist(id: string, data: ArtistDto) {
    try {
      await checkUUID(id);
      await cheskIsExists(id, this.prisma.artist);
      return await this.prisma.artist.update({
        where: { id },
        data: data,
      });
    } catch (error) {}
    // await checkUUID(id);

    // await cheskIsExists(id, artists);

    // for (const artist in artists) {
    //   if (Object.prototype.hasOwnProperty.call(artists, artist)) {
    //     if (artists[artist].id === id) {
    //       artists[artist].name = data.name;
    //       artists[artist].grammy = data.grammy;

    //       return artists[artist];
    //     }
    //   }
    // }
  }

  async deleteArtist(id: string) {
    try {
      await checkUUID(id);
      return await this.prisma.artist.delete({ where: { id } });
    } catch (error) {}
    // await checkUUID(id);
    // try {
    //   await this.trackService.updateManyTracksAfterDelete(id, 'artist');
    //   await this.favoritesService.deleteFromFavorites(id, 'artists');
    // } catch (error) {}

    // const artistIndex = artists.findIndex((artist) => artist.id === id);
    // if (artistIndex === -1) {
    //   throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    // }

    // if (artistIndex > -1) {
    //   artists.splice(artistIndex, 1);
    // }

    // return 'HttpStatus.NO_CONTENT';
  }
}
