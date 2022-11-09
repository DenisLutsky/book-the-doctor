import { IsOptional } from 'class-validator';
import { CreateAppointmentDto } from './create-appointment.dto';

export class UpdateAppointmentDto extends CreateAppointmentDto {
  @IsOptional()
  public date!: string;

  @IsOptional()
  public doctorId!: string;

  @IsOptional()
  public patientId!: string;
}
