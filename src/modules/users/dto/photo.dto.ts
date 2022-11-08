import { IsNotEmpty, IsUrl } from 'class-validator';

export class PhotoDto {
  @IsUrl()
  @IsNotEmpty()
  public url!: string;
}
