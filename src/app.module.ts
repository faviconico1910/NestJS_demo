import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { logger } from './common/middleware/logger/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { CatController } from './modules/cat/presenters/cat.controller';
import { CatModule } from './modules/cat/cat.module';
import { RegisterModule } from './modules/register/register.module';
import { UsersModule } from './modules/users/users.module';
import { DogModule } from './modules/dog/dog.module';
import { OrderModule } from './order/order.module';
import { OrderModule } from './src/order/order.module';
import { Module } from './order/src/modules/.module';
import { OrderModuleTsModule } from './src/modules/order/order.module.ts/order.module.ts.module';
import { OrderModule } from './modules/order/order.module';


@Module({
  imports: [CatModule, AuthModule, UsersModule, 
    ConfigModule.forRoot({
      isGlobal: true, // Cho phép sử dụng ConfigService ở bất kỳ đâu trong ứng dụng mà không cần import ConfigModule
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
        
        // tắt để k xung đột với migration
        synchronize: false
      })
    }),
      RegisterModule,
      DogModule,
      OrderModule,
      Module,
      OrderModuleTsModule
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