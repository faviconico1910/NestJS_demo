import {Dog} from '../entities/dog.entity';
import {IBaseRepository} from '../../../../core/base-application/base.repo.interface';
export const DOG_REPOSITORY = 'DOG_REPOSITORY';

export interface IDogRepository extends IBaseRepository<Dog> {
    findByName(name: string): Promise<Dog | null>;
}