import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signIn')
  async signIn(@Body() createUserDto: UserDto) {
    const { email, username, photoUrl } = createUserDto;

    try {
      const user = await this.authService.findOrCreate({
        email,
        username,
        photoUrl,
      });
      // Assuming you have some authentication logic here like generating tokens
      // You can add that logic here or call another method from AuthService.

      return { user }; // Return the user or token as needed
    } catch (error) {
      throw error;
    }
  }
}
