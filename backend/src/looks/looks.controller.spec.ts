import { Test, TestingModule } from '@nestjs/testing';
import { LooksController } from './looks.controller';
import { LooksService } from './looks.service';

describe('LooksController', () => {
	let controller: LooksController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [LooksController],
			providers: [LooksService],
		}).compile();

		controller = module.get<LooksController>(LooksController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
