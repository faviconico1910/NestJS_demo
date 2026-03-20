import {Module} from '@nestjs/common';
import { CatController } from './presenters/cat.controller';
import { CatsService } from './application/cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './infras/db/orm-entities/cat.entity';
import { CatRepository } from './infras/db/repositories/cat.repository';
@Module({
    imports: [TypeOrmModule.forFeature([Cat])],
    controllers: [CatController],
    providers: [CatsService, CatRepository],
    exports: [CatsService, CatRepository]
})

export class CatModule {}