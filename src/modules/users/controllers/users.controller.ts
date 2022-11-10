import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from '../dto';
import { User } from '../schemas';
import { UsersService } from '../services';

@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Post()
  public async create(@Body() input: CreateUserDto): Promise<User> {
    return await this.usersService.create(input);
  }

  @Get()
  public async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() input: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, input);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<boolean> {
    return this.usersService.remove(id);
  }
}
