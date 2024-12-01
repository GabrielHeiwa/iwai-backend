import { Injectable } from '@nestjs/common';
import { CreateClotheDto } from './dto/create-clothe.dto';
import { UpdateClotheDto } from './dto/update-clothe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Clothe } from './entities/clothe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClothesService {
	constructor(
		@InjectRepository(Clothe)
		private readonly clotheRepository: Repository<Clothe>,
	) {}

	create(createClotheDto: CreateClotheDto) {
		return 'This action adds a new clothe';
	}

	async findAll(page: string | number) {
		page = Number(page);

		const [clothes, total] = await this.clotheRepository.findAndCount({
			take: 10, // TODO: After remove this hardcoded
			skip: (page - 1) * 10,
		});

		return {
			data: clothes,
			page,
			total,
		};
	}

	async findOne(id: string) {
		const clothe = await this.clotheRepository.findOneOrFail({
			where: { uuid: id },
		});

		return {
			data: clothe,
		};
	}

	async update(id: string, updateClotheDto: UpdateClotheDto) {
		const clothe = await this.clotheRepository.findOneOrFail({
			where: { uuid: id },
		});

		const _clothe = {
			...clothe,
			...updateClotheDto,
		};

		const { raw, affected } = await this.clotheRepository.update(
			clothe.uuid,
			_clothe,
		);

		return {
			data: raw,
			affecteds: affected,
		};
	}

	async remove(id: string) {
		const clothe = await this.clotheRepository.findOneOrFail({
			where: { uuid: id },
		});

		const { raw, affected } = await this.clotheRepository.softDelete(
			clothe.uuid,
		);

		return {
			data: raw,
			total: affected,
		};
	}
}
