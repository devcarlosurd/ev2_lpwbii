import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Entidad Equipo para representar la tabla 'equipos' en MySQL.
 * Cumple estrictamente con la pauta de la Evaluación N.º 2 - IPVG 2026.
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
