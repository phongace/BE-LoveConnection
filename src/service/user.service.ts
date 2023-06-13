import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.chema';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async getAllUsers(): Promise<User[]> {
    const userData = await this.userModel.find();
    if (!userData || userData.length == 0) {
      throw new NotFoundException('Users data not found!');
    }
    return userData;
  }

  async createUser(userDto: UserDto): Promise<User> {
    const newUser = await new this.userModel(userDto);
    return newUser.save();
  }

  async editUserInformation(id: string, userDto: UserDto): Promise<User> {
    const existingUser = await this.userModel.findByIdAndUpdate(id, userDto, {
      new: true,
    });

    if (!existingUser) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existingUser;
  }

  async deleteUser(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return deletedUser;
  }
}
