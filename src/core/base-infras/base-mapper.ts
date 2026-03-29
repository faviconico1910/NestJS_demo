export abstract class BaseMapper<DomainEntity, OrmEntity> {
  abstract toDomain(entity: OrmEntity): DomainEntity;
  abstract toOrm(entity: DomainEntity): OrmEntity;
}