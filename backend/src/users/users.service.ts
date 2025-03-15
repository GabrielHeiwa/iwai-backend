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

	async getUserByEmail(
		email: string,
	): Promise<[undefined | any, User | undefined]> {
		try {
			const user = await this.userRepository.findOne({
				where: { email },
			});

			return [undefined, user];
		} catch (err: unknown) {
			console.error(err);

			return [
				{
					message: 'Error to find user',
					status: 400,
				},
				undefined,
			];
		}
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
