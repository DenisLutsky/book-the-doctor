import { IsOptional, IsString, Length } from 'class-validator';

import { Trim } from '@shared/decorators';
import { AppointmentDto } from './appointment.dto';

export class CreateAppointmentDto extends AppointmentDto {
  @Trim()
  @IsString()
  @Length(12, 24)
  @IsOptional()
  public patientId!: string;
}
