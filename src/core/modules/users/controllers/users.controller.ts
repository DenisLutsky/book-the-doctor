import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@core/auth/guards';
import { Roles } from '@shared/decorators';
import { RolesEnum } from '@shared/enums';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { User, UserDocument } from '../schemas';
import { UsersService } from '../services';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  // TODO: add doctor schema

  @Roles(RolesEnum.ADMIN)
  @Post()
  public async create(@Body() input: CreateUserDto): Promise<User> {
    return await this.usersService.create(input);
  }

  @Roles(RolesEnum.ADMIN, RolesEnum.DOCTOR)
  @Get()
  public async findAll(): Promise<UserDocument[]> {
    return this.usersService.findAll();
  }

  @Roles(RolesEnum.ADMIN, RolesEnum.DOCTOR)
  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Roles(RolesEnum.PATIENT, RolesEnum.DOCTOR)
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() input: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, input);
  }

  @Roles(RolesEnum.ADMIN)
  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<boolean> {
    return this.usersService.remove(id);
  }
}
