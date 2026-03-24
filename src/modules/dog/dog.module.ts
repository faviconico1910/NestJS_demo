import { Module } from '@nestjs/common';
import { DogController } from './presenters/dog.controller';
import { DogService } from './application/dog.service';
import { DOG_REPOSITORY } from './domain/dog.repository.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogRepository } from './infras/db/repositories/dog.repository';
import { DogEntity } from './infras/db/orm-entitites/dog.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([DogEntity])],
  controllers: [DogController],
  providers: [DogService, {
    provide: DOG_REPOSITORY,
    useClass: DogRepository
  }]
})
export class DogModule {}
