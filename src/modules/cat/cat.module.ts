import {Module} from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatsService } from './cats.service';


@Module({
    controllers: [CatController],
    providers: [CatsService],
    exports: [CatsService]
})

export class CatModule {}