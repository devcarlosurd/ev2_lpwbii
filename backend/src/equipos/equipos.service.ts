import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipo } from './entities/equipo.entity';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';

@Injectable()
export class EquiposService {
  constructor(
    // Inyectamos el repositorio de TypeORM para hacer operaciones SQL
    @InjectRepository(Equipo)
    private readonly equipoRepository: Repository<Equipo>,
  ) {}

  // 1. Listar todos (orden descendente por ID para ver los nuevos arriba)
  async findAll(): Promise<Equipo[]> {
    return await this.equipoRepository.find({
      order: { id: 'DESC' },
    });
  }

  // 2. Buscar por ID (lanza 404 si no existe)
  async findOne(id: number): Promise<Equipo> {
    const equipo = await this.equipoRepository.findOneBy({ id });
    if (!equipo) {
      throw new NotFoundException(`El equipo con ID ${id} no fue encontrado`);
    }
    return equipo;
  }

  // 3. Crear nuevo equipo
  async create(createEquipoDto: CreateEquipoDto): Promise<Equipo> {
    const nuevo = this.equipoRepository.create(createEquipoDto);
    return await this.equipoRepository.save(nuevo);
  }

  // 4. Actualizar equipo existente
  async update(id: number, updateEquipoDto: UpdateEquipoDto): Promise<Equipo> {
    const equipo = await this.findOne(id); // Reutilizamos findOne para asegurar que exista (o 404)
    const actualizado = Object.assign(equipo, updateEquipoDto);
    return await this.equipoRepository.save(actualizado);
  }

  // 5. Eliminar equipo
  async remove(id: number): Promise<{ message: string }> {
    const equipo = await this.findOne(id); // Si no existe lanza 404
    await this.equipoRepository.remove(equipo);
    return { message: `Equipo con ID ${id} eliminado exitosamente` };
  }
}