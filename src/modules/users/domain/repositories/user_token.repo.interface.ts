import { UserToken } from '../entities/user_token.entity'
import { IBaseRepository } from '../../../../core/base-application/base.repo.interface';

export const USER_TOKEN_REPOSITORY = 'USER_TOKEN_REPOSITORY';
export interface IUserTokenRepository extends IBaseRepository<UserToken> {
    findByToken(userId: number, token: string): Promise<UserToken | null>;
    revokeToken(userId: number, token: string): Promise<void>;
}