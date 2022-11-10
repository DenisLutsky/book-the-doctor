import { Controller, Get, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@core/auth/guards';
import { AppointmentDocument } from '@core/modules/appointments/schemas';
import { AppointmentsService } from '@core/modules/appointments/services';
import { Roles } from '@shared/decorators';
import { RolesEnum } from '@shared/enums';
import { UserDocument } from '../schemas';
import { UsersService } from '../services';

@UseGuards(AuthGuard)
@Controller('doctors')
export class DoctorsController {
  public constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  public async getDoctors(): Promise<UserDocument[]> {
    return this.usersService.findManyWithFilter({ role: RolesEnum.DOCTOR });
  }

  // TODO: need to update security

  @Roles(RolesEnum.DOCTOR)
  @Get(':doctorId/appointments/new')
  public async getNewAppointments(@Param('doctorId') doctorId: string): Promise<AppointmentDocument[]> {
    return this.appointmentsService.findManyWithFilter(doctorId);
  }

  @Roles(RolesEnum.DOCTOR)
  @Patch(':doctorId/appointments/:appointmentId')
  public async acceptAppointment(@Param('appointmentId') appointmentId: string): Promise<boolean> {
    return await this.appointmentsService.accept(appointmentId);
  }

  @Roles(RolesEnum.DOCTOR)
  @Delete(':doctorId/appointments/:appointmentId')
  public async rejectAppointment(@Param('appointmentId') appointmentId: string): Promise<boolean> {
    return await this.appointmentsService.reject(appointmentId);
  }
}
