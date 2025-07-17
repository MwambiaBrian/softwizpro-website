import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://softwizpro-website-backend.onrender.com',
    ], // frontend URL
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation with Swagger')
    .setVersion('1.0')
    //.addBearerAuth() // optional: for JWT support
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
