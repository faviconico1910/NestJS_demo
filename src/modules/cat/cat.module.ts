import { Module } from '@nestjs/common';
import { CatController } from './presenters/cat.controller';
import { CatsService } from './application/cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './infras/db/orm-entities/cat.orm-entity';
import { CatRepository } from './infras/db/repositories/cat.repo.impl';
import { CAT_REPOSITORY } from './domain/repositories/cat.repository.interface';
@Module({
    imports: [TypeOrmModule.forFeature([Cat])],
    controllers: [CatController],
    providers: [CatsService, 
        {
            provide: CAT_REPOSITORY,
            useClass: CatRepository
        }
    ],
    exports: [CatsService, CatRepository]
})

export class CatModule {}