import { Repository, FindOptionsWhere, DeepPartial } from 'typeorm';
import { IDriver } from './driver.interface';

export class TypeOrmDriver<T extends { id: number }> implements IDriver<T> {
  constructor(private readonly repo: Repository<T>) {}

  async save(entity: Partial<T>): Promise<T> {
    return await this.repo.save(entity as DeepPartial<T>);
  }

  async create(data: Partial<T>): Promise<T> {
    const entity = this.repo.create(data as DeepPartial<T>);
    return await this.repo.save(entity);
  }

  async findAll(query?: Partial<T>): Promise<T[]> {
    return await this.repo.find({ 
      where: query as FindOptionsWhere<T> 
    });
  }

  async findOne(query?: Partial<T>): Promise<T | null> {
    return await this.repo.findOne({ 
      where: query as FindOptionsWhere<T> 
    });
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    await this.repo.update(id, data as any);
    const updated = await this.findOne({ id } as any);
    return updated!;
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}