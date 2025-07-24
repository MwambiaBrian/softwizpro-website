import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Put('activate/:token')
  activate(@Param('token') token: string) {
    return this.usersService.activateAccount(token);
  }

  @Post('request-password-reset')
  requestReset(@Body('username') username: string) {
    return this.usersService.requestPasswordReset(username);
  }

  @Put('reset-password/:token')
  resetPassword(
    @Param('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.usersService.resetPassword(token, newPassword);
  }
}
