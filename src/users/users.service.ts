import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll(res: Response) {
    return res.render('list-users', {
      layout: 'layout',
      message: 'Lists all users here!',
    });
  }

  async findOne(res: Response, id: number) {
    // return `This action returns a #${id} user`;
    const user = await this.prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    console.log('findOne', { id, user });
    return res.render('show-user', {
      layout: 'layout',
      user: JSON.stringify(user, null, 2),
      userFullName: `${user.fullName}`,
      userId: `${user.id}`,
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
