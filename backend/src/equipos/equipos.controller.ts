import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';

@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) {}

  /**
   * GET /equipos
   * Listar todos los equipos registrados.
   */
  @Get()
  async findAll() {
    return await this.equiposService.findAll();
  }

  /**
   * GET /equipos/:id
   * Obtener el detalle de un equipo por su ID.
   * Retorna 404 si no existe.
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.equiposService.findOne(id);
  }

  /**
   * POST /equipos
   * Registrar un nuevo equipo en el inventario.
   * Retorna HTTP 201 Created con el objeto persistido.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createEquipoDto: CreateEquipoDto) {
    return await this.equiposService.create(createEquipoDto);
  }

  /**
   * PATCH /equipos/:id
   * Actualizar los datos de un equipo existente.
   * Retorna 404 si el equipo no existe.
   */
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEquipoDto: UpdateEquipoDto,
  ) {
    return await this.equiposService.update(id, updateEquipoDto);
  }

  /**
   * DELETE /equipos/:id
   * Eliminar un equipo del inventario.
   * Retorna 404 si el equipo no existe.
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.equiposService.remove(id);
  }
}
