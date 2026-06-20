import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

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