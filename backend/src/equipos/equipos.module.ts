import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from './entities/equipo.entity';

@Module({
  // Registra la entidad Equipo dentro del módulo para tener acceso a su repositorio
  imports: [TypeOrmModule.forFeature([Equipo])],
  exports: [TypeOrmModule],
})
export class EquiposModule {}