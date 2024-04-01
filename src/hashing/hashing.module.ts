import { Module } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [HashingService, ConfigService],
  exports: [HashingService],
})
export class HashingModule {}
