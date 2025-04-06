import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { LooksService } from './looks.service';
import { CreateLookDto } from './dto/create-look.dto';
import { UpdateLookDto } from './dto/update-look.dto';

@Controller('looks')
export class LooksController {
	constructor(private readonly looksService: LooksService) {}

	@Post()
	create(@Body() createLookDto: CreateLookDto) {
		return this.looksService.create(createLookDto);
	}

	@Get()
	findAll() {
		return this.looksService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.looksService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateLookDto: UpdateLookDto) {
		return this.looksService.update(+id, updateLookDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.looksService.remove(+id);
	}
}
