import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  atletica?: string;

  @IsOptional()
  @IsString()
  curso?: string;

  @IsOptional()
  @IsString()
  sobre?: string;
}