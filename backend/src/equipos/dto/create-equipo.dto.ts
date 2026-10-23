import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsIn,
  IsDateString,
  IsOptional,
} from 'class-validator';

/**
 * DTO para la creación de un nuevo Equipo.
 * Implementa las reglas mínimas exigidas por la pauta de evaluación.
 */
export class CreateEquipoDto {
  @IsString({ message: 'El código de inventario debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El código de inventario es obligatorio' })
  @MinLength(3, {
    message: 'El código de inventario debe tener al menos 3 caracteres',
  })
  codigoInventario: string;

  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  nombre: string;

  @IsString({ message: 'El tipo debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El tipo de equipo es obligatorio' })
  tipo: string;

  @IsString({ message: 'La marca debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La marca no puede estar vacía' })
  marca: string;

  @IsString({ message: 'El modelo debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El modelo no puede estar vacío' })
  modelo: string;

  @IsString({ message: 'La ubicación debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La ubicación no puede estar vacía' })
  ubicacion: string;

  @IsString({ message: 'El estado debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsIn(['Disponible', 'En uso', 'Mantención', 'Baja'], {
    message:
      'El estado solo puede corresponder a: Disponible, En uso, Mantención o Baja',
  })
  estado: string;

  @IsDateString(
    {},
    {
      message:
        'La fecha de adquisición debe tener un formato de fecha válido (YYYY-MM-DD)',
    },
  )
  @IsNotEmpty({ message: 'La fecha de adquisición es obligatoria' })
  fechaAdquisicion: string;

  @IsOptional()
  @IsString({ message: 'Las observaciones deben ser texto' })
  observaciones?: string;
}
