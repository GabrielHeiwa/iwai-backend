import { Module } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { ClothesController } from './clothes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clothe } from './entities/clothe.entity';
import { MinioService } from 'src/minio/minio.service';
@Module({
	imports: [TypeOrmModule.forFeature([Clothe])],
	controllers: [ClothesController],
	providers: [ClothesService, MinioService],
})
export class ClothesModule {}
