import { IBaseRepository } from "../../../../core/base-application/base.repo.interface";
import { Role } from "../entities/role.entity";

// Nhớ truyền con "Role Xịn" (Domain Entity) vào chữ T nhé
export interface IRoleRepository extends IBaseRepository<Role> {
    
    findByName(name: string): Promise<Role | null>;
}