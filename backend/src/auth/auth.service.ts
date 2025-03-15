import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async register(registerDto: RegisterDto) {
		const { email, password, passwordConfirm } = registerDto;

		if (password !== passwordConfirm) {
			throw new Error('Passwords do not match');
		}

		const [err, userFinded] = await this.usersService.getUserByEmail(email);

		if (err) return new BadRequestException(err);
		if (userFinded) return new BadRequestException('User already exists');

		const user = new User();
		user.email = email;
		user.password = this.hashPassword(password);

		const [errCreate, userCreate] =
			await this.usersService.createUser(user);

		if (errCreate) return new BadRequestException(errCreate);

		const payload = { email: userCreate.email, sub: userCreate.id };

		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	async login(loginDto: any) {
		const { email, password } = loginDto;

		const [err, user] = await this.usersService.getUserByEmail(email);

		if (err) return new BadRequestException(err);

		const isPasswordMatch = this.comparePassword(password, user.password);

		if (!isPasswordMatch) {
			return new BadRequestException('Invalid password');
		}

		const payload = { email: user.email, sub: user.id };

		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	private hashPassword(password: string) {
		return bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));
	}

	private comparePassword(password: string, hash: string) {
		return bcrypt.compareSync(password, hash);
	}
}
