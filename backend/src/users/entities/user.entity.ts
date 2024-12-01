import { Clothe } from 'src/clothes/entities/clothe.entity';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
class User {
	@PrimaryGeneratedColumn('increment')
	id: Number;

	@Column({ generated: 'uuid', unique: true })
	uuid: string;

	@Column({ name: 'external_id' })
	externalId: string;

	@OneToMany(() => Clothe, (clothe) => clothe.userId)
	clothes: Clothe[];

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@DeleteDateColumn({ name: 'deleted_at' })
	deletedAt: null | Date;
}

export { User };