import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { serverModeResponse } from './app.util';

@Injectable()
export class AppService {
  getHome(res: Response) {
    const responseObj = {
      layout: 'layout',
      message: 'Hello World!',
    };
    return serverModeResponse('ssr', res, responseObj, 'home');
  }
}
