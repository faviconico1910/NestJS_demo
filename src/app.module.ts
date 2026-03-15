import { Logger, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatController } from './modules/cat/cat.controller';
import { CatModule } from './modules/cat/cat.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { logger } from './common/middleware/logger/logger.middleware';  
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './common/guards/api-key.guard';  
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CatModule, AuthModule, UsersModule, 
    ConfigModule.forRoot({
      isGlobal: true
    }),
      TypeOrmModule.forRootAsync({
        inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        
        // Tự động load các Entity 
        autoLoadEntities: true, 
        
        // đã tự tạo bảng trước đó
        synchronize: false,
      })
    })
  ],
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