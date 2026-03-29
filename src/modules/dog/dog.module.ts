import { Module } from '@nestjs/common';
import { DogController } from './presenters/dog.controller';
import { DogService } from './application/dog.service';
import { DOG_REPOSITORY } from './domain/repositories/dog.repository.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogRepository } from './infras/db/repositories/dog.repo.impl';
import { DogEntity } from './infras/db/orm-entitites/dog.orm-entity';
import { DogMapper } from './infras/db/mappers/dog.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([DogEntity])],
  controllers: [DogController],
  providers: [DogService, DogMapper, {
    provide: DOG_REPOSITORY,
    useClass: DogRepository
  }],
  exports: [DogService, DOG_REPOSITORY]
})
export class DogModule {}
