import { Logger, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatController } from './cat/cat.controller';
import { CatsService } from './cats/cats.service';
import { CatModule } from './cat.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { logger } from './common/middleware/logger/logger.middleware';  

@Module({
  imports: [CatModule],
  controllers: [AppController],
  providers: [AppService, CatsService],
})

// // apply middleware
// export class AppModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(LoggerMiddleware)
//       .forRoutes(CatController);
//   }
// }


// apply functional middleware
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .forRoutes(CatController);
  } 
}