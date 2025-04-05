import { PartialType } from '@nestjs/mapped-types';
import { CreateLookDto } from './create-look.dto';

export class UpdateLookDto extends PartialType(CreateLookDto) {}
