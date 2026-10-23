import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipo } from './entities/equipo.entity';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';

@Injectable()
export class EquiposService {
  constructor(
    @InjectRepository(Equipo)
    private readonly equipoRepository: Repository<Equipo>,
  ) {}

  /**
   * Obtiene la lista completa de equipos registrados en la base de datos MySQL.
   */
  async findAll(): Promise<Equipo[]> {
    return await this.equipoRepository.find({
      order: { id: 'DESC' }, // Orden descendente para ver primero los más recientes
    });
  }

  /**
   * Busca un equipo por su clave primaria (ID).
   * Si no existe, lanza un error HTTP 404 (NotFoundException).
   */
  async findOne(id: number): Promise<Equipo> {
    const equipo = await this.equipoRepository.findOneBy({ id });
    if (!equipo) {
      throw new NotFoundException(`El equipo con ID ${id} no fue encontrado`);
    }
    return equipo;
  }

  /**
   * Registra un nuevo equipo en la base de datos MySQL previa validación por DTO.
   */
  async create(createEquipoDto: CreateEquipoDto): Promise<Equipo> {
    const nuevoEquipo = this.equipoRepository.create(createEquipoDto);
    return await this.equipoRepository.save(nuevoEquipo);
  }

  /**
   * Actualiza parcialmente la información de un equipo existente.
   * Lanza HTTP 404 si el registro no existe.
   */
  async update(id: number, updateEquipoDto: UpdateEquipoDto): Promise<Equipo> {
    const equipo = await this.findOne(id); // Reutiliza findOne para asegurar que exista (o 404)
    const equipoActualizado = Object.assign(equipo, updateEquipoDto);
    return await this.equipoRepository.save(equipoActualizado);
  }

  /**
   * Elimina un equipo de la base de datos.
   * Lanza HTTP 404 si el registro no existe.
   */
  async remove(id: number): Promise<{ message: string }> {
    const equipo = await this.findOne(id); // Verifica existencia previa
    await this.equipoRepository.remove(equipo);
    return { message: `Equipo con ID ${id} eliminado exitosamente` };
  }
}
