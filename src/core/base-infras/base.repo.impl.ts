import { IBaseRepository } from "../base-application/base.repo.interface";
import { BaseMapper } from "./base-mapper";
import { IDriver } from "./driver/driver.interface";

export abstract class BaseRepository<DomainEntity, OrmEntity>
  implements IBaseRepository<DomainEntity> {

  constructor(
    protected readonly driver: IDriver<OrmEntity>,
    protected readonly mapper: BaseMapper<DomainEntity, OrmEntity>
  ) {}


  async save(entity: DomainEntity): Promise<DomainEntity> {
    const ormEntity = this.mapper.toOrm(entity);
    const savedEntity = await this.driver.save(ormEntity as Partial<OrmEntity>);
    return this.mapper.toDomain(savedEntity);
  }

  async findAll(query?: Partial<DomainEntity>): Promise<DomainEntity[]> {
    const ormQuery = query ? this.mapper.toOrm(query as DomainEntity) : {};
    const entities = await this.driver.findAll(ormQuery as Partial<OrmEntity>);
    return entities.map(e => this.mapper.toDomain(e));
  }

  async findOne(query?: Partial<DomainEntity>): Promise<DomainEntity | null> {
    const ormQuery = this.mapper.toOrm(query as DomainEntity);
    const entity = await this.driver.findOne(ormQuery as Partial<OrmEntity>);
    return entity ? this.mapper.toDomain(entity) : null;
  }

  async create(data: Partial<DomainEntity>): Promise<DomainEntity> {
    const ormEntity = this.mapper.toOrm(data as DomainEntity);
    const entity = await this.driver.create(ormEntity as Partial<OrmEntity>);
    return this.mapper.toDomain(entity);
  }

  async findById(id: number): Promise<DomainEntity | null> {
    const entity = await this.driver.findOne( { id } as unknown as Partial<OrmEntity>);
    return entity ? this.mapper.toDomain(entity) : null;
  }

  async update(id: number, data: Partial<DomainEntity>): Promise<DomainEntity> {
    const ormData = this.mapper.toOrm(data as DomainEntity);
    await this.driver.update(id, ormData as any);
    return (await this.findById(id)) as DomainEntity;
  }

  async delete(id: number): Promise<void> {
    await this.driver.delete(id);
  }
}