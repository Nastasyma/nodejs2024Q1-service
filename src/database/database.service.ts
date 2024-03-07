import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DatabaseService {
  private readonly users: User[] = [];

  addUser(user: User) {
    this.users.push(user);
  }

  getUsers() {
    return this.users;
  }

  getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  updateUser(user: User) {
    const index = this.users.findIndex((u) => u.id === user.id);
    this.users[index] = user;
  }

  deleteUser(id: string) {
    const index = this.users.findIndex((u) => u.id === id);
    this.users.splice(index, 1);
  }
}
