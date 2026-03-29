import { Repository, ObjectLiteral, DeepPartial, FindOptionsWhere } from "typeorm";
import { IBaseRepository } from "../base-application/base.repo.interface";
import { BaseMapper } from "./base-mapper";

export abstract class BaseRepository<DomainEntity, OrmEntity extends ObjectLiteral>
  implements IBaseRepository<DomainEntity> {

  constructor(
    protected readonly repository: Repository<OrmEntity>,
    protected readonly mapper: BaseMapper<DomainEntity, OrmEntity>
  ) {}


  async save(entity: DomainEntity): Promise<DomainEntity> {
    const ormEntity = this.mapper.toOrm(entity);
    const savedEntity = await this.repository.save(ormEntity as DeepPartial<OrmEntity>);
    return this.mapper.toDomain(savedEntity);
  }

  async findAll(query?: Partial<DomainEntity>): Promise<DomainEntity[]> {
    const ormQuery = query ? this.mapper.toOrm(query as DomainEntity) : {};
    const entities = await this.repository.find({ where: ormQuery as FindOptionsWhere<OrmEntity> });
    return entities.map(e => this.mapper.toDomain(e));
  }

  async findOne(query?: Partial<DomainEntity>): Promise<DomainEntity | null> {
    const ormQuery = this.mapper.toOrm(query as DomainEntity);
    const entity = await this.repository.findOne({ where: ormQuery as FindOptionsWhere<OrmEntity> });
    return entity ? this.mapper.toDomain(entity) : null;
  }

  async create(data: Partial<DomainEntity>): Promise<DomainEntity> {
    const ormEntity = this.mapper.toOrm(data as DomainEntity);
    const entity = this.repository.create(ormEntity as DeepPartial<OrmEntity>);
    const saved = await this.repository.save(entity);
    return this.mapper.toDomain(saved);
  }

  async findById(id: number): Promise<DomainEntity | null> {
    const entity = await this.repository.findOne({ where: { id } as unknown as FindOptionsWhere<OrmEntity> });
    return entity ? this.mapper.toDomain(entity) : null;
  }

  async update(id: number, data: Partial<DomainEntity>): Promise<DomainEntity> {
    const ormData = this.mapper.toOrm(data as DomainEntity);
    await this.repository.update(id, ormData as any);
    return (await this.findById(id)) as DomainEntity;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}