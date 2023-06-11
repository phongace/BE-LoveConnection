import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Put(':id')
  async editUserInformation(@Param('id') id: string, @Body() user: UserDto) {
    return this.userService.editUserInformation(id, user);
  }
}
