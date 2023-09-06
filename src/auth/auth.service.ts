import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.chema';
import { UserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async findOrCreate({ email, username, photoUrl }): Promise<any> {
    const user = await this.findUserByEmail(email);
    let accessToken = await this.generateJwtToken(email);

    if (!user) {
      const newUser = await this.createUser({ email, username, photoUrl });
      accessToken = await this.generateJwtToken(newUser);
      return { newUser, accessToken };
    }

    return { user, accessToken };
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const userData = await this.userService.findByEmail(email);

      if (!userData) return null;

      const user: User = {
        username: userData.username,
        email: userData.email,
        photoUrl: userData.photoUrl,
      };

      return user;
    } catch (error) {
      console.error('Error while finding user by email:', error);
      throw error;
    }
  }

  async createUser(createUserDto: UserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  async generateJwtToken(data): Promise<string> {
    const payload: { email: any; sub?: string } = { email: data };

    if (data.id) payload.sub = data.id;

    return this.jwtService.signAsync(payload);
  }
}
