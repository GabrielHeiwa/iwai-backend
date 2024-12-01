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

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 4002,
			username: 'postgres',
			password: 'supersecret',
			database: 'postgres',
			entities: [User, Image, Clothe],
			synchronize: process.env.ENV === 'production' ? false : true,
		}),
		UsersModule,
		ClothesModule,
		ImagesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
