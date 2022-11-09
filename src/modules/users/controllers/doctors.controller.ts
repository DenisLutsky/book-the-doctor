import { Controller, Get, Patch, Param, Delete } from '@nestjs/common';

import { AppointmentDocument } from 'src/modules/appointments/schemas';
import { AppointmentsService } from 'src/modules/appointments/services';

@Controller('doctors')
export class DoctorsController {
  public constructor(private readonly appointmentsService: AppointmentsService) {}

  // TODO: add authentication and get id form context
  @Get(':doctorId/appointments/new')
  public async getNewAppointments(@Param('doctorId') doctorId: string): Promise<AppointmentDocument[]> {
    return this.appointmentsService.findManyWithFilter(doctorId);
  }

  @Patch(':doctorId/appointments/:appointmentId')
  public async acceptAppointment(@Param('appointmentId') appointmentId: string): Promise<boolean> {
    return (await this.appointmentsService.update(appointmentId, { isActive: true })) && true;
  }

  @Delete(':doctorId/appointments/:appointmentId')
  public async rejectAppointment(@Param('appointmentId') appointmentId: string): Promise<boolean> {
    return await this.appointmentsService.remove(appointmentId);
  }
}
