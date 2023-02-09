import {
  HttpException,
  HttpStatus,
  // Inject,
  Injectable,
  // forwardRef,
} from '@nestjs/common';

import { IFavoritesRepsonse, sectionType } from './favorites.interface';
import { checkUUID } from 'src/helpers/checkers';
// import { AlbumService } from 'src/album/album.service';
// import { ArtistService } from 'src/artist/artist.service';
// import { TrackService, tracks } from 'src/track/track.service';
import { PrismaService } from 'src/prisma/prisma.service';
// import { Favorite } from '@prisma/client';

// export const favorites: IFavoritesRepsonse = {
//   artist: [],
//   album: [],
//   track: [],
// };

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

  // async remove(id: string, section: string) {
  //   const index = favorites[section].findIndex((el) => el.id === id);

  //   if (index === -1) {
  //     throw new HttpException(
  //       'UNPROCESSABLE_ENTITY',
  //       HttpStatus.UNPROCESSABLE_ENTITY,
  //     );
  //   }

  //   if (index > -1) {
  //     favorites[section].splice(index, 1);
  //   }
  // }
}
