import { Module } from '@nestjs/common';
// import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { AppService } from 'src/app.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ApiController],
  providers: [
    AppService,
    UsersService,
    PrismaService,
    // ApiService
  ],
})
export class ApiModule {}
