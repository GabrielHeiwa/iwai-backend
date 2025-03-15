import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async register(@Body() registerDto: RegisterDto) {
		return await this.authService.register(registerDto);
	}

	@Post('login')
	async login(@Body() loginDto: any) {
		return await this.authService.login(loginDto);
	}

	@UseGuards(AuthGuard)
	@Post('me')
	async me(@Request() req) {
		return req.user;
	}
}
