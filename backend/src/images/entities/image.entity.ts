import { Clothe } from 'src/clothes/entities/clothe.entity';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'images' })
class Image {
	@PrimaryGeneratedColumn('increment')
	id: Number;

	@Column({ generated: 'uuid', unique: true })
	uuid: string;

	@Column()
	url: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@DeleteDateColumn({ name: 'deleted_at' })
	deletedAt: null | Date;
}

export { Image };
