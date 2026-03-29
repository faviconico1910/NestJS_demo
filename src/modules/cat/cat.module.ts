import { Module } from '@nestjs/common';
import { CatController } from './presenters/cat.controller';
import { CatsService } from './application/cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from './infras/db/orm-entities/cat.orm-entity';
import { CatRepository } from './infras/db/repositories/cat.repo.impl';
import { CAT_REPOSITORY } from './domain/repositories/cat.repository.interface';
import { CatMapper } from './infras/db/mappers/cat.mapper';
@Module({
    imports: [TypeOrmModule.forFeature([CatEntity])],
    controllers: [CatController],
    providers: [CatsService, CatMapper, {
            provide: CAT_REPOSITORY,
            useClass: CatRepository
        }
    ],
    exports: [CatsService, CAT_REPOSITORY]
})

export class CatModule {}