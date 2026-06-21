import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body);
  }

  @Post('register')
  register(
    @Body()
    body: {
      nome: string;
      email: string;
      password: string;
      atletica?: string;
      curso?: string;
      sobre?: string;
    },
  ) {
    return this.authService.register(body);
  }
}