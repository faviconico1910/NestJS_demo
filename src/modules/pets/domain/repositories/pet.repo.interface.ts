import { IBaseRepository } from "src/core/base-application/base.repo.interface";
import { Pet } from "../entities/pet.entity";

export const PET_REPOSITORY = 'PET_REPOSITORY';
export interface IPetRepository extends IBaseRepository<Pet> {}