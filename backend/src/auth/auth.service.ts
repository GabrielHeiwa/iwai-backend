import {
	BadRequestException,
	HttpException,
	HttpStatus,
	Injectable,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async register(registerDto: RegisterDto) {
		const { email, password, confirmPassword } = registerDto;

		if (password !== confirmPassword) {
			throw new HttpException(
				'Passwords do not match',
				HttpStatus.BAD_REQUEST,
			);
		}

		const [err, userFinded] = await this.usersService.getUserByEmail(email);

		if (err) throw new HttpException(err, HttpStatus.BAD_REQUEST);
		if (userFinded)
			throw new HttpException(
				'User already exists',
				HttpStatus.BAD_REQUEST,
			);

		const user = new User();
		user.email = email;
		user.password = this.hashPassword(password);
		user.lastLogin = new Date();

		const [errCreate, userCreate] =
			await this.usersService.createUser(user);

		if (errCreate) return new BadRequestException(errCreate);

		const payload = { email: userCreate.email, sub: userCreate.id };

		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	async login(loginDto: LoginDto) {
		const { email, password } = loginDto;

		const [err, user] = await this.usersService.getUserByEmail(email);

		if (err) return new BadRequestException(err);

		const isPasswordMatch = this.comparePassword(password, user.password);

		if (!isPasswordMatch) {
			return new BadRequestException('Invalid password');
		}

		const payload = { email: user.email, sub: user.id };

		user.lastLogin = new Date();

		await this.usersService.updateUser(user);

		return {
			message: 'Login success',
			data: {
				accessToken: this.jwtService.sign(payload),
			},
		};
	}

	private hashPassword(password: string) {
		return bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));
	}

	private comparePassword(password: string, hash: string) {
		return bcrypt.compareSync(password, hash);
	}
}
