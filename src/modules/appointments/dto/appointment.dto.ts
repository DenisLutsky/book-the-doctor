import { Trim } from '@shared/decorators';
import { IsDateString, IsDefined, IsNotEmpty, IsString, Length } from 'class-validator';

export class AppointmentDto {
  @Trim()
  @IsDateString()
  @IsNotEmpty()
  @IsDefined()
  public date!: string;

  @Trim()
  @IsString()
  @Length(12, 24)
  @IsDefined()
  public doctorId!: string;
}
