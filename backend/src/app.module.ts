import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ClothesModule } from './clothes/clothes.module';
import { ImagesModule } from './images/images.module';
import { Image } from './images/entities/image.entity';
import { Clothe } from './clothes/entities/clothe.entity';
import { ConfigModule } from '@nestjs/config';
import { MinioService } from './minio/minio.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { LooksModule } from './looks/looks.module';
import { Look } from './looks/entities/look.entity';
import LookClothe from './looks/entities/lookClothe.entity';

@Module({
	imports: [
		ConfigModule.forRoot(),
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '1d' },
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: [User, Image, Clothe, Look, LookClothe],
			synchronize: process.env.ENV === 'production' ? false : true,
		}),
		UsersModule,
		ClothesModule,
		ImagesModule,
		AuthModule,
		LooksModule,
	],
	controllers: [AuthController],
	providers: [MinioService, AuthService, UsersService],
})
export class AppModule {}
