import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsIn,
  IsDateString,
  IsOptional,
} from 'class-validator';

/**
 * DTO (Data Transfer Object) para validar los datos al crear un nuevo equipo.
 */
export class CreateEquipoDto {
  // Código de inventario obligatorio y mínimo 3 letras/números
  @IsString({ message: 'El código de inventario debe ser texto' })
  @IsNotEmpty({ message: 'El código de inventario es obligatorio' })
  @MinLength(3, { message: 'El código de inventario debe tener al menos 3 caracteres' })
  codigoInventario: string;

  // Nombre obligatorio y mínimo 3 letras
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  nombre: string;

  @IsString({ message: 'El tipo debe ser texto' })
  @IsNotEmpty({ message: 'El tipo de equipo es obligatorio' })
  tipo: string;

  @IsString({ message: 'La marca debe ser texto' })
  @IsNotEmpty({ message: 'La marca no puede estar vacía' })
  marca: string;

  @IsString({ message: 'El modelo debe ser texto' })
  @IsNotEmpty({ message: 'El modelo no puede estar vacío' })
  modelo: string;

  @IsString({ message: 'La ubicación debe ser texto' })
  @IsNotEmpty({ message: 'La ubicación no puede estar vacía' })
  ubicacion: string;

  // REGLA CRÍTICA DE LA PAUTA: Solo estos 4 estados son válidos
  @IsString({ message: 'El estado debe ser texto' })
  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsIn(['Disponible', 'En uso', 'Mantención', 'Baja'], {
    message: 'El estado solo puede corresponder a: Disponible, En uso, Mantención o Baja',
  })
  estado: string;

  // Valida que venga en formato de fecha (YYYY-MM-DD)
  @IsDateString({}, { message: 'La fecha de adquisición debe ser una fecha válida (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'La fecha de adquisición es obligatoria' })
  fechaAdquisicion: string;

  // Campo opcional
  @IsOptional()
  @IsString({ message: 'Las observaciones deben ser texto' })
  observaciones?: string;
}