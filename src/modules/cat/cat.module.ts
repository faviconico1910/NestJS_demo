import {Module} from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatsService } from './cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Cat])],
    controllers: [CatController],
    providers: [CatsService],
    exports: [CatsService]
})

export class CatModule {}