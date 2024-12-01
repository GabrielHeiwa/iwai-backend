import { Image } from 'src/images/entities/image.entity';
import { User } from 'src/users/entities/user.entity';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'clothes' })
class Clothe {
	@PrimaryGeneratedColumn('increment')
	id: Number;

	@Column({ generated: 'uuid', unique: true })
	uuid: string;

	@Column()
	category: string;

	@Column()
	color: string;

	@Column()
	size: string;

	@Column()
	obs: string;

	@OneToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	userId: Number;

    @OneToOne(() => Image)
    @JoinColumn({ name: 'image_id' })
    imageId: Number;

	@Column({ name: 'is_draft', default: true })
	isDraft: Boolean;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@DeleteDateColumn({ name: 'deleted_at' })
	deletedAt: null | Date;
}

export { Clothe };
