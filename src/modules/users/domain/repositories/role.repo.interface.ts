import { IBaseRepository } from "../../../../core/base-application/base.repo.interface";
import { Role } from "../entities/role.entity";


export interface IRoleRepository extends IBaseRepository<Role> {
    findByName(name: string): Promise<Role | null>;
}