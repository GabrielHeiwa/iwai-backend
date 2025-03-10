import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ClothesModule } from './clothes/clothes.module';
import { ImagesModule } from './images/images.module';
import { Image } from './images/entities/image.entity';
import { Clothe } from './clothes/entities/clothe.entity';
import { ConfigModule } from '@nestjs/config';
import { MinioService } from './minio/minio.service';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: [User, Image, Clothe],
			synchronize: process.env.ENV === 'production' ? false : true,
		}),
		UsersModule,
		ClothesModule,
		ImagesModule,
	],
	controllers: [AppController],
	providers: [AppService, MinioService],
})
export class AppModule {}
