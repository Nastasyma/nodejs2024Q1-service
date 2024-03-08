import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from 'src/database/database.service';
import { Album } from './entities/album.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AlbumService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(): Album[] {
    return this.databaseService.getAlbums();
  }

  findOne(id: string): Album {
    const album = this.databaseService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return plainToClass(Album, album);
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    const album = new Album(
      createAlbumDto.year,
      createAlbumDto.name,
      createAlbumDto.artistId,
    );
    this.databaseService.addAlbum(album);
    return plainToClass(Album, album);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const album = this.databaseService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    album.year = updateAlbumDto.year;
    album.name = updateAlbumDto.name;
    album.artistId = updateAlbumDto.artistId;
    this.databaseService.updateAlbum(album);
    return plainToClass(Album, album);
  }

  remove(id: string): void {
    const album = this.databaseService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    this.databaseService.deleteAlbum(id);
  }
}
