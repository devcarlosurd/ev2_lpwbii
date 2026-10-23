import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Entidad TypeORM que representa la tabla 'equipos' en MySQL.
 */
@Entity('equipos')
export class Equipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  codigoInventario: string;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  tipo: string;

  @Column({ type: 'varchar', length: 50 })
  marca: string;

  @Column({ type: 'varchar', length: 50 })
  modelo: string;

  @Column({ type: 'varchar', length: 100 })
  ubicacion: string;

  @Column({ type: 'varchar', length: 30 })
  estado: string; // 'Disponible' | 'En uso' | 'Mantención' | 'Baja'

  @Column({ type: 'date' })
  fechaAdquisicion: string;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;
}