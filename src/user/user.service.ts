import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(): User[] {
    return this.databaseService.getUsers();
  }

  findOne(id: string): User {
    const user = this.databaseService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return plainToClass(User, user);
  }

  create(createUserDto: CreateUserDto): User {
    const user = new User(createUserDto.login, createUserDto.password);
    this.databaseService.addUser(user);
    return plainToClass(User, user);
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
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
    this.databaseService.updateUser(user);
    return plainToClass(User, user);
  }

  remove(id: string): void {
    const user = this.databaseService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.databaseService.deleteUser(id);
  }
}
