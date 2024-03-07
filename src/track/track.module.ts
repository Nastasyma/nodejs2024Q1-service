import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, DatabaseService],
  exports: [DatabaseService],
})
export class TrackModule {}
