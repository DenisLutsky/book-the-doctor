import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CreateAppointmentDto, UpdateAppointmentDto } from '../dto';
import { AppointmentDocument } from '../schemas';
import { AppointmentsService } from '../services';

@Controller('appointments')
export class AppointmentsController {
  public constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  public async create(@Body() input: CreateAppointmentDto): Promise<AppointmentDocument> {
    return this.appointmentsService.create(input);
  }

  @Get()
  public async findAll(): Promise<AppointmentDocument[]> {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<AppointmentDocument> {
    return this.appointmentsService.findOne(id);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() input: UpdateAppointmentDto): Promise<AppointmentDocument> {
    return this.appointmentsService.update(id, input);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<boolean> {
    return this.appointmentsService.remove(id);
  }
}
