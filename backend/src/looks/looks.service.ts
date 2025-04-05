import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLookDto } from './dto/create-look.dto';
import { UpdateLookDto } from './dto/update-look.dto';
import { Look } from './entities/look.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LooksService {
	constructor(private readonly looksRepository: Repository<Look>) {}

	async create(createLookDto: CreateLookDto) {
		const look = this.looksRepository.create(createLookDto);
		return await this.looksRepository.save(look);
	}

	async findAll() {
		return await this.looksRepository.find();
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
		return await this.looksRepository.save(look);
	}

	async remove(id: number) {
		const look = await this.findOne(id);
		return await this.looksRepository.remove(look);
	}
}
