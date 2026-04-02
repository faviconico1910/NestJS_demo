import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { OrderModule } from './modules/order/order.module';
import { RegisterModule } from './modules/register/register.module';
import { UsersModule } from './modules/users/users.module';


@Module({
  imports: [ AuthModule, UsersModule, 
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
      OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

// // apply middleware
// export class AppModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(LoggerMiddleware)
//       .forRoutes(CatController);
//   }
// }


// apply functional middleware
// export class AppModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(logger)
//       .forRoutes(CatController);
//   } 
// }