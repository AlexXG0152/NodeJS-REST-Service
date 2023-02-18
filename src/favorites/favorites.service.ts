import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { checkUUID } from 'src/helpers/checkers';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class FavoritesService {
  constructor(
    // @Inject(forwardRef(() => ArtistService))
    // private artistService: ArtistService,
    // @Inject(forwardRef(() => AlbumService))
    // private albumService: AlbumService,
    // @Inject(forwardRef(() => TrackService))
    // private trackService: TrackService,
    private prisma: PrismaService,
  ) {}

  async getAllFavoritesCollections(): Promise<any> {
    try {
      return await this.prisma.favorite.findMany({
        include: { artist: true, album: true, track: true },
      });
    } catch (error) {}
  }

  async getOneFavoriteCollection(id: string) {
    await checkUUID(id);
    try {
      return await this.prisma.favorite.findUnique({
        where: { id },
        include: { artist: true, album: true, track: true },
      });
    } catch (error) {}
  }

  async createFavoritesCollection(id: string) {
    await checkUUID(id);
    try {
      return await this.prisma.favorite.create({
        data: {},
        include: { artist: true, album: true, track: true },
      });
    } catch (error) {
      throw new HttpException(
        'UNPROCESSABLE_ENTITY',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async addToFavorites(id: string, section: string, fav: any) {
    await checkUUID(id);
    try {
      switch (section) {
        case 'artist':
          return await this.prisma.favorite.update({
            where: { id },
            data: {
              artist: {
                connect: { id: fav.id },
              },
            },
            include: { artist: true },
          });

        case 'album':
          return await this.prisma.favorite.update({
            where: { id },
            data: {
              album: {
                connect: { id: fav.id },
              },
            },
            include: { album: true },
          });

        case 'track':
          return await this.prisma.favorite.update({
            where: { id },
            data: {
              track: {
                connect: { id: fav.id },
              },
            },
            include: { track: true },
          });

        default:
          const unknownSection = section;
          throw new Error(`Unknown section ${unknownSection}`);
      }
    } catch (error) {}
  }

  async deleteFromFavorites(id: string, section: string, fav: any) {
    await checkUUID(id);
    try {
      switch (section) {
        case 'artist':
          return await this.prisma.favorite.update({
            where: { id },
            data: {
              artist: {
                disconnect: { id: fav.id },
              },
            },
            include: { artist: true },
          });

        case 'album':
          return await this.prisma.favorite.update({
            where: { id },
            data: {
              album: {
                disconnect: { id: fav.id },
              },
            },
            include: { album: true },
          });

        case 'track':
          return await this.prisma.favorite.update({
            where: { id },
            data: {
              track: {
                disconnect: { id: fav.id },
              },
            },
            include: { track: true },
          });

        default:
          const unknownSection = section;
          throw new Error(`Unknown section ${unknownSection}`);
      }
    } catch (error) {}
  }
}
