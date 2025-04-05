import { Module } from '@nestjs/common';
import { LooksService } from './looks.service';
import { LooksController } from './looks.controller';

@Module({
  controllers: [LooksController],
  providers: [LooksService],
})
export class LooksModule {}
