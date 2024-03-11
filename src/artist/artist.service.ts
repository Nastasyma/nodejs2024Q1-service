import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service';
import { Artist } from './entities/artist.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ArtistService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(): Artist[] {
    return this.databaseService.getArtists();
  }

  findOne(id: string): Artist {
    const artist = this.databaseService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return plainToClass(Artist, artist);
  }

  create(createArtistDto: CreateArtistDto): Artist {
    const artist = new Artist(createArtistDto.name, createArtistDto.grammy);
    this.databaseService.addArtist(artist);
    return plainToClass(Artist, artist);
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist = this.databaseService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    this.databaseService.updateArtist(artist);
    return plainToClass(Artist, artist);
  }

  remove(id: string): void {
    const artist = this.databaseService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    this.databaseService.deleteArtist(id);
  }
}
