import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './schemas/user.schema';
import { UserDto } from './dtos/user.dto';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: UserModel,
  ) {}

  async addFakeUsers() {
    const fakeUsers: UserDto[] = [
      {
        username: 'ho3einmolavi',
      },
      {
        username: 'atish',
      },
    ];

    const promises = fakeUsers.map(({ username }) => {
      return this.userModel.findOneAndUpdate(
        {
          username,
        },
        {
          username,
        },
        {
          upsert: true,
        },
      );
    });
    return Promise.all(promises);
  }

  async getUserById(userId: Types.ObjectId): Promise<UserDto> {
    return this.userModel.findOne({ _id: userId });
  }
}
