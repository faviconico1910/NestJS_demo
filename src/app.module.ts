import { Logger, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatController } from './cat/cat.controller';
import { CatModule } from './cat.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { logger } from './common/middleware/logger/logger.middleware';  
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './common/guards/api-key.guard';  
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CatModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService]
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