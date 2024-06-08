/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { PrismaService } from 'src/prisma.service';
import { serverModeResponse } from 'src/app.util';
import { ServerMode } from 'src/app.types';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll(res: Response) {
    const responseObj = {
      layout: 'layout',
      message: 'Lists all users here!',
    };
    return serverModeResponse('ssr', res, responseObj, 'list-users');
  }

  async findOne(res: Response, id: number, serverMode: ServerMode) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    const responseObj = {
      layout: 'layout',
      user: JSON.stringify(user, null, 2),
      userFullName: `${user.fullName}`,
      userId: `${user.id}`,
    };
    // return `This action returns a #${id} user`;

    console.log('findOne', { id, user });
    return serverModeResponse(serverMode, res, responseObj, 'show-user');
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
