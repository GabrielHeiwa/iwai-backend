import { Injectable } from '@nestjs/common';
import { Client } from 'minio';

@Injectable()
export class MinioService {
	private minioClient: Client;

	constructor() {
		this.minioClient = new Client({
			endPoint: 'localhost',
			port: 4000,
			useSSL: false,
			accessKey: 'iwai',
			secretKey: 'supersecret',
		});
	}

	async uploadFile(
		file: Express.Multer.File,
		bucketName: string,
	): Promise<string> {
		const fileName = `${Date.now()}-${file.originalname}`;

		await this.minioClient.putObject(
			bucketName,
			fileName,
			file.buffer,
			file.size,
			{
				'Content-Type': file.mimetype,
			},
		);

		return fileName;
	}

	async createBucket(bucketName: string): Promise<void> {
		const bucketExists = await this.minioClient.bucketExists(bucketName);

		if (!bucketExists) {
			await this.minioClient.makeBucket(bucketName);
		}
	}

	async getFileUrl(bucketName: string, fileName: string): Promise<string> {
		const presignedUrl = await this.minioClient.presignedGetObject(
			bucketName,
			fileName,
			24 * 60 * 60,
		); // 24 hour expiry
		return presignedUrl;
	}
}
