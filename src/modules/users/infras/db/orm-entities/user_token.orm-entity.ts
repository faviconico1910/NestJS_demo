import { BaseOrmEntity } from 'src/core/base-infras/base.orm-entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.orm-entity';

@Entity('user_tokens')
export class UserTokenEntity extends BaseOrmEntity {
    @Column({nullable: false})
    user_id: number;

    @Column({ name: 'refresh_token_hash', type: 'varchar', length: 255 })
    refreshTokenHash: string;

    @Column({ name: 'device_info', type: 'varchar', length: 255 })
    deviceInfo: string;

    @Column({ name: 'is_revoked', type: 'boolean', default: false })
    isRevoked: boolean;

    @Column({ name: 'expire_at', type: 'timestamp' })
    expireAt: Date;

    // Quan hệ với UserEntity
    @ManyToOne(() => UserEntity, user => user.tokens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id'})
    user: UserEntity;
}