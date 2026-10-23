import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipoDto } from './create-equipo.dto';

/**
 * DTO para la actualización de un Equipo existente.
 * Hereda todas las validaciones de CreateEquipoDto convirtiéndolas en opcionales.
 */
export class UpdateEquipoDto extends PartialType(CreateEquipoDto) {}
