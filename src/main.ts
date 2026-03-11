import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ApiKeyGuard } from './common/guards/api-key.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // cấu hình swagger
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Base exception filter dùng httpAdapter
  const httpAdapter = app.getHttpAdapter();
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // use global guards
  // app.useGlobalGuards(new ApiKeyGuard)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
