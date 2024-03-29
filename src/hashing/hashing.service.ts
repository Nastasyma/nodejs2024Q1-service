import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  salt: number;

  constructor(private readonly configService: ConfigService) {
    this.salt = +this.configService.get<number>('CRYPT_SALT', 10);
  }

  async getHash(data: string) {
    return await bcrypt.hash(data, this.salt);
  }

  async comparePassword(data: string, hashedPassword: string) {
    return await bcrypt.compare(data, hashedPassword);
  }
}
