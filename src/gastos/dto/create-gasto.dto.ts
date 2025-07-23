import { IsString, IsNotEmpty, IsNumber, IsDateString, IsInt, IsBoolean, IsOptional, Min, Max } from 'class-validator';

export class CreateGastoDto {
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNumber()
  monto: number;

  @IsDateString()
  fecha: string;

  @IsInt()
  categoriaId: number;

  @IsBoolean()
  @IsOptional()
  esCuota?: boolean;

  @IsInt()
  @Min(1)
  @IsOptional()
  cuotaActual?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  totalCuotas?: number;
}
