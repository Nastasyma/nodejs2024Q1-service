import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';
import { plainToClass } from 'class-transformer';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(): Track[] {
    return this.databaseService.getTracks();
  }

  findOne(id: string): Track {
    const track = this.databaseService.getTrackById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return plainToClass(Track, track);
  }

  create(createUserDto: CreateTrackDto): Track {
    const track = new Track(
      createUserDto.name,
      createUserDto.artistId || null,
      createUserDto.albumId || null,
      createUserDto.duration,
    );
    this.databaseService.addTrack(track);
    return plainToClass(Track, track);
  }

  update(id: string, updateUserDto: UpdateTrackDto): Track {
    const track = this.databaseService.getTrackById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    track.name = updateUserDto.name;
    if (updateUserDto.artistId) {
      track.artistId = updateUserDto.artistId;
    }
    if (updateUserDto.albumId) {
      track.albumId = updateUserDto.albumId;
    }
    track.duration = updateUserDto.duration;
    this.databaseService.updateTrack(track);
    return plainToClass(Track, track);
  }

  remove(id: string) {
    const track = this.databaseService.getTrackById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return this.databaseService.deleteTrack(id);
  }
}
