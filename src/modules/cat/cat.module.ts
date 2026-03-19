import {Module} from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatsService } from './cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { CatRepository } from '../../infrastructure/repositories/cat.repository';
@Module({
    imports: [TypeOrmModule.forFeature([Cat])],
    controllers: [CatController],
    providers: [CatsService, CatRepository],
    exports: [CatsService, CatRepository]
})

export class CatModule {}