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

  create(createTrackDto: CreateTrackDto): Track {
    const track = new Track(
      createTrackDto.name,
      createTrackDto.artistId || null,
      createTrackDto.albumId || null,
      createTrackDto.duration,
    );
    this.databaseService.addTrack(track);
    return plainToClass(Track, track);
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const track = this.databaseService.getTrackById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    track.name = updateTrackDto.name;
    if (updateTrackDto.artistId) {
      track.artistId = updateTrackDto.artistId;
    }
    if (updateTrackDto.albumId) {
      track.albumId = updateTrackDto.albumId;
    }
    track.duration = updateTrackDto.duration;
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
