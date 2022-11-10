import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, BadRequestException } from '@nestjs/common';

import { AuthGuard } from '@core/auth/guards';
import { Roles } from '@shared/decorators';
import { RolesEnum } from '@shared/enums';
import { CreateAppointmentDto, UpdateAppointmentDto } from '../dto';
import { AppointmentDocument } from '../schemas';
import { AppointmentsService } from '../services';
import { IJwtPayload } from '@core/auth/interfaces';

@UseGuards(AuthGuard)
@Controller('appointments')
export class AppointmentsController {
  public constructor(private readonly appointmentsService: AppointmentsService) {}

  @Roles(...Object.values(RolesEnum))
  @Post()
  public async create(
    @Body() input: CreateAppointmentDto,
    @Req() req: { user: IJwtPayload },
  ): Promise<AppointmentDocument> {
    if (
      (!input.patientId && req.user.role === RolesEnum.ADMIN) ||
      (!input.patientId && req.user.role === RolesEnum.DOCTOR) ||
      (!input.patientId && req.user.role === RolesEnum.PATIENT && !req.user.id)
    ) {
      throw new BadRequestException(`Please provide patient id`);
    }

    return this.appointmentsService.create({
      ...input,
      date: `${input.date} ${input.time}`,
      patientId: input.patientId || req.user.id,
    });
  }

  @Roles(RolesEnum.ADMIN)
  @Get()
  public async findAll(): Promise<AppointmentDocument[]> {
    return this.appointmentsService.findAll();
  }

  @Roles(RolesEnum.ADMIN)
  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<AppointmentDocument> {
    return this.appointmentsService.findOneById(id);
  }

  // @Roles(...Object.values(RolesEnum))
  // @Patch(':id')
  // public async update(@Param('id') id: string, @Body() input: UpdateAppointmentDto): Promise<AppointmentDocument> {
  //   return this.appointmentsService.update(id, input);
  // }

  @Roles(...Object.values(RolesEnum))
  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<boolean> {
    return this.appointmentsService.remove(id);
  }
}
