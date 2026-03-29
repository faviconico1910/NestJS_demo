import {Cat} from "../entities/cat.entity";
import {IBaseRepository} from "../../../../core/base-application/base.repo.interface";
export const CAT_REPOSITORY = 'CAT_REPOSITORY';

export interface ICatRepository extends IBaseRepository<Cat> {
    findByName(name: string): Promise<Cat | null>;
}