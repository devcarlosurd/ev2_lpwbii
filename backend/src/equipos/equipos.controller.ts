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

@Controller('equipos') // Prefijo de la URL: http://localhost:3000/equipos
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) {}

  @Get() // GET /equipos
  async findAll() {
    return await this.equiposService.findAll();
  }

  @Get(':id') // GET /equipos/:id
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.equiposService.findOne(id);
  }

  @Post() // POST /equipos
  @HttpCode(HttpStatus.CREATED) // Devuelve HTTP 201 Created
  async create(@Body() createEquipoDto: CreateEquipoDto) {
    return await this.equiposService.create(createEquipoDto);
  }

  @Patch(':id') // PATCH /equipos/:id
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEquipoDto: UpdateEquipoDto,
  ) {
    return await this.equiposService.update(id, updateEquipoDto);
  }

  @Delete(':id') // DELETE /equipos/:id
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.equiposService.remove(id);
  }
}