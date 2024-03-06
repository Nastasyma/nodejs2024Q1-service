import { Injectable } from '@nestjs/common';
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
    return this.databaseService.getUserById(id);
  }
  create(createUserDto: CreateUserDto) {
    return this.databaseService.addUser(
      new User(createUserDto.login, createUserDto.password),
    );
  }
  update(id: string, updateUserDto: UpdateUserDto) {
    return this.databaseService.updateUser(
      new User(updateUserDto.login, updateUserDto.password),
    );
  }
  remove(id: string) {
    return this.databaseService.deleteUser(id);
  }
}
