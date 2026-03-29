import { IBaseRepository } from '../../../../core/base-application/base.repo.interface';
import { Role } from '../../../../common/enums/role.enum';
import { User } from '../entities/user.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY';
export interface IUserRepository extends IBaseRepository<User> {
    findByUsername(username: string): Promise<User | null>;
    findOneWithRelations(id: number): Promise<User | null>;
}