import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingService } from 'src/hashing/hashing.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingService,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => plainToClass(User, user));
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return plainToClass(User, user);
  }

  async findOneByLogin(login: string) {
    return await this.prisma.user.findUnique({ where: { login } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashingService.getHash(
      createUserDto.password,
    );
    const user = await this.prisma.user.create({
      data: {
        login: createUserDto.login,
        password: hashedPassword,
      },
    });
    return plainToClass(User, user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordsEqual = await this.hashingService.comparePassword(
      updateUserDto.oldPassword,
      user.password,
    );

    if (!isPasswordsEqual) {
      throw new ForbiddenException('Wrong password');
    }

    const hashedNewPassword = await this.hashingService.getHash(
      updateUserDto.newPassword,
    );

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: hashedNewPassword,
        version: { increment: 1 },
      },
    });
    return plainToClass(User, updatedUser);
  }

  async remove(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.prisma.user.delete({ where: { id } });
  }

  async isUserValid(login: string, password: string) {
    const user = await this.findOneByLogin(login);
    if (!user) {
      return null;
    }

    const isPasswordValid = await this.hashingService.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return null;
    }

    return plainToClass(User, user);
  }

  async isUserLoginExist(login: string) {
    return !!(await this.findOneByLogin(login));
  }
}
