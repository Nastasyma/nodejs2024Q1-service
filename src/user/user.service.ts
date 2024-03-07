import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.getUsers();
  }

  findOne(id: string) {
    const user = this.databaseService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  create(createUserDto: CreateUserDto): User {
    const user = new User(createUserDto.login, createUserDto.password);
    this.databaseService.addUser(user);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.databaseService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (updateUserDto.oldPassword !== user.password) {
      throw new ForbiddenException('Wrong password');
    }
    user.version++;
    user.updatedAt = Date.now();
    user.password = updateUserDto.newPassword;
    this.databaseService.updateUser(user)
    return user;
  }

  remove(id: string) {
    const user = this.databaseService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.databaseService.deleteUser(id);
  }
}
