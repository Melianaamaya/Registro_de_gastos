import { IsString, IsNotEmpty, IsNumber, IsDateString, IsInt } from 'class-validator';

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
}
