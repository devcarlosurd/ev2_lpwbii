import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from './equipos/entities/equipo.entity';
import { EquiposModule } from './equipos/equipos.module';

@Module({
  imports: [
    // 1. Carga de forma global las variables del archivo .env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // 2. Conexión asíncrona a MySQL usando las variables de entorno
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: parseInt(config.get<string>('DB_PORT', '3306'), 10),
        username: config.get<string>('DB_USER', 'root'),
        password: config.get<string>('DB_PASSWORD', ''),
        database: config.get<string>('DB_NAME', 'inventario_tecnologico'),
        entities: [Equipo], // Entidades que TypeORM debe cargar
        synchronize: true,  // Sincroniza la estructura de la tabla automáticamente
      }),
    }),

    EquiposModule,
  ],
})
export class AppModule {}