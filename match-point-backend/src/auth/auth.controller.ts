import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return {
      success: true,
      message: 'Login realizado com sucesso',
      data: this.auth.login(body),
    };
  }

  @Post('register')
  register(@Body() body: RegisterDto) {
    return {
      success: true,
      message: 'Cadastro realizado com sucesso',
      data: this.auth.register(body),
    };
  }
}