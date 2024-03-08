import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.getFavorites();
  }

  addArtistToFavorites(id: string) {
    if (!this.databaseService.isExistFavorite(id, 'artists')) {
      throw new UnprocessableEntityException(
        'Artist with the given id does not exist',
      );
    }
    this.databaseService.addFavorite(id, 'artists');
  }

  addAlbumToFavorites(id: string) {
    if (!this.databaseService.isExistFavorite(id, 'albums')) {
      throw new UnprocessableEntityException(
        'Album with the given id does not exist',
      );
    }
    this.databaseService.addFavorite(id, 'albums');
  }

  addTrackToFavorites(id: string) {
    if (!this.databaseService.isExistFavorite(id, 'tracks')) {
      throw new UnprocessableEntityException(
        'Track with the given id does not exist',
      );
    }
    this.databaseService.addFavorite(id, 'tracks');
  }

  removeArtistFromFavorites(id: string) {
    this.databaseService.deleteFavorite(id, 'artists');
  }

  removeAlbumFromFavorites(id: string) {
    this.databaseService.deleteFavorite(id, 'albums');
  }

  removeTrackFromFavorites(id: string) {
    this.databaseService.deleteFavorite(id, 'tracks');
  }
}
