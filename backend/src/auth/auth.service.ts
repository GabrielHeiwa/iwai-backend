import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService) {}

	async register(registerDto: RegisterDto) {
		const { email, password, passwordConfirm } = registerDto;

		if (password !== passwordConfirm) {
			throw new Error('Passwords do not match');
		}

		const [err] = await this.usersService.getUserByEmail(email);

		if (err) return new BadRequestException(err);

		const user = new User();
		user.email = email;
		user.password = this.hashPassword(password);

		const [errCreate, userCreate] =
			await this.usersService.createUser(user);

		if (errCreate) return new BadRequestException(errCreate);

		return userCreate;
	}

	private hashPassword(password: string) {
		return bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));
	}
}
