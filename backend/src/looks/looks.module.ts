import { Module } from '@nestjs/common';
import { LooksService } from './looks.service';
import { LooksController } from './looks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Look } from './entities/look.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Look])],
	controllers: [LooksController],
	providers: [LooksService],
})
export class LooksModule {}
