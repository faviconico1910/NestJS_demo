import { Repository, DeepPartial, FindOneOptions, FindManyOptions, ObjectLiteral } from "typeorm";


// abstract class không thể khởi tạo, chỉ để kế thừa
export abstract class BaseRepository<T extends ObjectLiteral>  {
    constructor (protected readonly repository: Repository<T>) {}

    // find all
    async findAll(options?: FindManyOptions<T>): Promise<T[]> {
        return this.repository.find(options);
    }

    // find theo điều kiện
    async findOne(options: FindOneOptions<T>): Promise<T | null> {
        return await this.repository.findOne(options);
    }

    // Tạo mới
    async create(data: DeepPartial<T>): Promise<T> {
        const entity = this.repository.create(data);
        return await this.repository.save(entity);
    }
}