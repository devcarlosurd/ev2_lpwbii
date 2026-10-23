import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. CORS: Permite que el frontend en Vue (puerto 5173) pueda conectarse a este backend (puerto 3000)
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 2. ValidationPipe: Aplica las reglas del DTO a todas las peticiones
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // Descarta propiedades que no estén en el DTO
      forbidNonWhitelisted: true, // Da error 400 si envían datos no permitidos
      transform: true,            // Transforma tipos automáticamente
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Servidor API REST NestJS ejecutándose en: http://localhost:${port}`);
}
bootstrap();