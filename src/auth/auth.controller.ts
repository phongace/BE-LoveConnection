import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/user.dto';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signIn')
  async signIn(@Body() createUserDto: UserDto, @Res() res: Response) {
    const { email, username, photoUrl } = createUserDto;

    try {
      const { user, accessToken } = await this.authService.findOrCreate({
        email,
        username,
        photoUrl,
      });

      res.status(HttpStatus.OK).send({
        statusCode: res.statusCode,
        message: 'Sign In Successful',
        user,
        accessToken,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send({
        statusCode: res.statusCode,
        message: error.message,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
