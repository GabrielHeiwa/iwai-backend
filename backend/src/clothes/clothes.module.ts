import { Module } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { ClothesController } from './clothes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clothe } from './entities/clothe.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Clothe])],
	controllers: [ClothesController],
	providers: [ClothesService],
})
export class ClothesModule {}
