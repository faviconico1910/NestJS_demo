export interface IBaseRepository<T> {
    findAll(query?: Partial<T>): Promise<T[]>;
    findOne(query: Partial<T>): Promise<T | null>;
    create(data: Partial<T>): Promise<T>;
    save(entity: T): Promise<T>;
    findById(id: number): Promise<T | null>;
    update(id: number, data: Partial<T>): Promise<T>;
    delete(id: number): Promise<void>;
}