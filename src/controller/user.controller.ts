import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Res() response) {
    try {
      const userData = await this.userService.getAllUsers();
      return response.status(HttpStatus.OK).json({
        message: 'All users data found successfully',
        userData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post()
  async createUser(@Res() response, @Body() user: UserDto) {
    try {
      const newUser = await this.userService.createUser(user);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        newUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put(':id')
  async editUserInformation(
    @Res() response,
    @Param('id') id: string,
    @Body() user: UserDto,
  ) {
    try {
      const existingUser = await this.userService.editUserInformation(id, user);
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        existingUser,
      });
    } catch (err) {
      throw new BadRequestException(
        'An error occurred while updating the information. Please try again later or contact support for assistance.',
        {
          cause: new Error('Cause Error'),
          description: 'Some errors',
        },
      );
    }
  }

  @Delete(':id')
  async deleteUser(@Res() response, @Param('id') id: string) {
    try {
      const deletedUser = await this.userService.deleteUser(id);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        deletedUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
