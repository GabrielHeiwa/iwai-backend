import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('looks')
export class Look {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@PrimaryGeneratedColumn('uuid')
	uuid: string;

	@Column()
	name: string;

	@Column()
	image: string;

	@Column({ type: 'jsonb', default: [] })
	items: Array<{
		id: string;
		name: string;
		category: string;
		image: string;
		position: { x: number; y: number };
		zIndex: number;
		scale: number;
		rotation: number;
	}>;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@DeleteDateColumn({ name: 'deleted_at' })
	deletedAt: Date;
}
