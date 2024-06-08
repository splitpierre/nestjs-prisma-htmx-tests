import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
// import { ServerMode } from './app.types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHome(@Res() res: any) {
    return this.appService.getHome(res);
  }
}
