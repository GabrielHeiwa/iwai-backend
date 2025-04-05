import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	UseInterceptors,
	UploadedFile,
} from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { CreateClotheDto } from './dto/create-clothe.dto';
import { UpdateClotheDto } from './dto/update-clothe.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('clothes')
export class ClothesController {
	constructor(private readonly clothesService: ClothesService) {}

	@Post()
	@UseInterceptors(FileInterceptor('photo'))
	create(
		@Body() createClotheDto: CreateClotheDto,
		@UploadedFile() file: Express.Multer.File,
	) {
		return this.clothesService.create(createClotheDto, file);
	}

	@Get()
	findAll(@Query('page') page: string) {
		return this.clothesService.findAll(page);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.clothesService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateClotheDto: UpdateClotheDto) {
		return this.clothesService.update(id, updateClotheDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.clothesService.remove(id);
	}
}
