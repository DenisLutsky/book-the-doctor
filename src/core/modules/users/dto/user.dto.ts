import { RolesEnum } from '@shared/enums';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MinLength, ValidateNested } from 'class-validator';

import { Trim } from '@shared/decorators';
import { PhotoDto } from './photo.dto';

export class UserDto {
  @Trim()
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @Trim()
  @IsString()
  @MinLength(2)
  public firstName!: string;

  @Trim()
  @IsString()
  @MinLength(2)
  public lastName!: string;

  @ValidateNested()
  @Type(() => PhotoDto)
  @IsOptional()
  public photo!: PhotoDto;

  @Trim()
  @Matches(new RegExp('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$'))
  @IsOptional()
  public phone!: string;

  @IsEnum(RolesEnum)
  @IsOptional()
  public role!: RolesEnum;
}
