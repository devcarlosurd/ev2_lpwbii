import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from './equipos/entities/equipo.entity';
import { EquiposModule } from './equipos/equipos.module';

@Module({
  imports: [
    // Carga de variables de entorno desde .env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Conexión asíncrona a MySQL mediante TypeORM utilizando las variables de entorno
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
        entities: [Equipo],
        synchronize: true, // Sincroniza automáticamente la entidad con la base de datos
      }),
    }),

    EquiposModule,
  ],
})
export class AppModule {}
