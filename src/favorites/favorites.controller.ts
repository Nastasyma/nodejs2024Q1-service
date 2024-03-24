import {
  Controller,
  Get,
  Post,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtistToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addArtistToFavorites(id);
  }

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbumToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addAlbumToFavorites(id);
  }

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrackToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addTrackToFavorites(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtistFromFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.favoritesService.removeArtistFromFavorites(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbumFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.removeAlbumFromFavorites(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrackFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.removeTrackFromFavorites(id);
  }
}
