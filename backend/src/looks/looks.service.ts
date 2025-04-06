import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLookDto } from './dto/create-look.dto';
import { UpdateLookDto } from './dto/update-look.dto';
import { Look } from './entities/look.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LooksService {
	constructor(
		@InjectRepository(Look)
		private readonly looksRepository: Repository<Look>,
	) {}

	async create(createLookDto: CreateLookDto) {
		const look = this.looksRepository.create(createLookDto);
		return {
			data: await this.looksRepository.save(look),
			message: 'Look criado com sucesso',
		};
	}

	async findAll() {
		return {
			data: await this.looksRepository.find(),
			message: 'Looks encontrados com sucesso',
		};
	}

	async findOne(id: number) {
		const look = await this.looksRepository.findOne({ where: { id } });
		if (!look) {
			throw new NotFoundException(`Look with ID ${id} not found`);
		}
		return look;
	}

	async update(id: number, updateLookDto: UpdateLookDto) {
		const look = await this.findOne(id);
		this.looksRepository.merge(look, updateLookDto);
		return {
			data: await this.looksRepository.save(look),
			message: 'Look atualizado com sucesso',
		};
	}

	async remove(id: number) {
		const look = await this.findOne(id);
		return {
			data: await this.looksRepository.remove(look),
			message: 'Look removido com sucesso',
		};
	}
}
