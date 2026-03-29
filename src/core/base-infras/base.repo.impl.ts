import { Repository, DeepPartial, FindOneOptions, FindManyOptions, ObjectLiteral, FindOptionsWhere } from "typeorm";
import { IBaseRepository } from "../base-application/base.repo.interface";

// abstract class không thể khởi tạo, chỉ để kế thừa
export abstract class BaseRepository<T extends ObjectLiteral> implements IBaseRepository<T>  {
    
    constructor (protected readonly repository: Repository<T>) {}

    // find all
    async save(entity: T): Promise<T> {
        return await this.repository.save(entity as DeepPartial<T>);
    }
    async findAll(query?: Partial<T>): Promise<T[]> {
        if (query) {
            return await this.repository.find({ where: query as unknown as FindOptionsWhere<T> });
        }
        return await this.repository.find();
    }

    // find theo điều kiện
    async findOne(query?: Partial<T>): Promise<T | null> {
        return await this.repository.findOne({
            where: query as unknown as FindOptionsWhere<T>,
        })
    }

    // Tạo mới
    async create(data: Partial<T>): Promise<T> {
        const entity = this.repository.create(data as DeepPartial<T>);
        return await this.repository.save(entity); 
    }

    // find theo id
    async findById(id: number): Promise<T | null>{
        return await this.repository.findOne({ where: { id } as unknown as FindOptionsWhere<T> });
    }

    async update(id: number, data: Partial<T>): Promise<T> {
        await this.repository.update(id, data as any);
        return await this.findById(id) as T;
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}