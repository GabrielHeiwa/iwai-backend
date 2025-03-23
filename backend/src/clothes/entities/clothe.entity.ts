import { Image } from 'src/images/entities/image.entity';
import { User } from 'src/users/entities/user.entity';
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

@Entity({ name: 'clothes' })
class Clothe {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ generated: 'uuid', unique: true })
	uuid: string;

	@Column()
	category: string;

	@Column()
	color: string;

	@Column()
	size: string;

	@Column()
	observations: string;

	@Column()
	photo: string;

	@OneToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	userId: number;

	@OneToOne(() => Image)
	@JoinColumn({ name: 'image_id' })
	imageId: number;

	@Column({ name: 'is_draft', default: true })
	isDraft: boolean;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@DeleteDateColumn({ name: 'deleted_at' })
	deletedAt: null | Date;
}

export { Clothe };
