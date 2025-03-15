import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	async getUserByEmail(email: string) {
		const user = await this.userRepository.findOne({ where: { email } });

		if (user) {
			return [
				{
					message: 'User already exists',
					status: 400,
				},
			];
		}

		return [undefined, undefined];
	}

	async createUser(user: User) {
		try {
			const newUser = this.userRepository.create(user);
			await this.userRepository.save(newUser);

			return [undefined, newUser];
		} catch (err) {
			return [err, undefined];
		}
	}
}
