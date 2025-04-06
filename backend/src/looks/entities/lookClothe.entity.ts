import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Look } from './look.entity';
import { Clothe } from 'src/clothes/entities/clothe.entity';

@Entity('looks_clothes')
export default class LookClothe {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@PrimaryGeneratedColumn('uuid')
	uuid: string;

	@OneToOne(() => Look)
	@JoinColumn()
	lookId: number;

	@OneToOne(() => Clothe)
	@JoinColumn({ name: 'clothe_id' })
	clotheId: number;
}
