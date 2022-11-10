import { Trim } from '@shared/decorators';
import { IsDefined, IsNotEmpty, IsString, Length } from 'class-validator';

export class AppointmentDto {
  @Trim()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  public date!: string;

  @Trim()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  public time!: string;

  @Trim()
  @IsString()
  @Length(12, 24)
  @IsDefined()
  public doctorId!: string;
}
