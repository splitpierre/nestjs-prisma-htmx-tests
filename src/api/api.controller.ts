import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from '../app.service';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';

@Controller('api')
export class ApiController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
  ) {}

  @Get()
  getHome(@Res() res: Response) {
    return this.appService.getHome(res);
  }

  @Get('users/:id')
  getUser(@Res() res: Response, @Param('id') id: number) {
    return this.userService.findOne(res, id, 'api');
  }

  @Get('users')
  getUsers(@Res() res: Response) {
    return this.userService.findAll(res);
  }
}
