import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipoDto } from './create-equipo.dto';

/**
 * Al heredar de PartialType(CreateEquipoDto), todos los campos
 * se vuelven opcionales, pero si el usuario envía alguno, se valida
 * con las mismas reglas estrictas del CreateEquipoDto.
 */
export class UpdateEquipoDto extends PartialType(CreateEquipoDto) {}