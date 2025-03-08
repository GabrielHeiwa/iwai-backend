import { Injectable } from '@nestjs/common';
import { CreateClotheDto } from './dto/create-clothe.dto';
import { UpdateClotheDto } from './dto/update-clothe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Clothe } from './entities/clothe.entity';
import { Repository } from 'typeorm';
import { MinioService } from 'src/minio/minio.service';

@Injectable()
export class ClothesService {
	constructor(
		@InjectRepository(Clothe)
		private readonly clotheRepository: Repository<Clothe>,
		private readonly minioService: MinioService,
	) {}

	async create(createClotheDto: CreateClotheDto, file: Express.Multer.File) {
		// TODO: Add at bucket name user id to create a unique folder for each user
		const fileKey = await this.minioService.uploadFile(file, 'iwai');

		const clothe = this.clotheRepository.create({
			...createClotheDto,
			photo: fileKey,
		});

		const savedClothe = await this.clotheRepository.save(clothe);

		return {
			message: 'Clothe created successfully',
			data: savedClothe,
		};
	}

	async findAll(page: string | number | undefined) {
		page = Number(page ?? 1);

		const [clothes, total] = await this.clotheRepository.findAndCount({
			take: 10, // TODO: After remove this hardcoded
			skip: (page - 1) * 10,
		});

		const clothesWithImage = await Promise.all(
			clothes.map(async (clothe) => ({
				...clothe,
				image: await this.minioService.getFileUrl('iwai', clothe.photo),
			})),
		);

		return {
			data: clothesWithImage,
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
