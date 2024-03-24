import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Album[]> {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return plainToClass(Album, album);
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = await this.prisma.album.create({
      data: {
        year: createAlbumDto.year,
        name: createAlbumDto.name,
        artistId: createAlbumDto.artistId,
      },
    });
    return plainToClass(Album, album);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    const updatedAlbum = await this.prisma.album.update({
      where: { id },
      data: {
        year: updateAlbumDto.year,
        name: updateAlbumDto.name,
        artistId: updateAlbumDto.artistId,
      },
    });
    return plainToClass(Album, updatedAlbum);
  }

  async remove(id: string): Promise<void> {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    await this.prisma.album.delete({ where: { id } });
  }
}
