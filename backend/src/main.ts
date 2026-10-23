import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Habilitar CORS para permitir que el frontend en Vue.js pueda comunicarse con la API
  app.enableCors({
    origin: '*', // Permite solicitudes desde cualquier origen local (ej. http://localhost:5173 de Vite)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 2. Activar ValidationPipe global para aplicar las validaciones declaradas en los DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Descarta propiedades que no estén explícitamente definidas en el DTO
      forbidNonWhitelisted: true, // Devuelve HTTP 400 Bad Request si el cliente envía datos no declarados
      transform: true, // Transforma tipos automáticamente (por ejemplo strings a números o fechas)
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Servidor API REST NestJS ejecutándose en: http://localhost:${port}`);
}
bootstrap();
