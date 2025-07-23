import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gasto } from './entities/gasto.entity';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { Categoria } from '../categorias/entities/categoria.entity';

@Injectable()
export class GastosService {
  constructor(
    @InjectRepository(Gasto)
    private gastoRepository: Repository<Gasto>,

    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async create(dto: CreateGastoDto): Promise<Gasto> {
  const categoria = await this.categoriaRepository.findOne({
    where: { id: dto.categoriaId },
  });

  if (!categoria) {
    throw new NotFoundException('Categoría no encontrada');
  }

  const gasto = new Gasto();
  gasto.descripcion = dto.descripcion;
  gasto.monto = dto.monto;
  gasto.fecha = dto.fecha;
  gasto.categoria = categoria;
  gasto.esCuota = dto.esCuota ?? false;
  gasto.cuotaActual = dto.cuotaActual;
  gasto.totalCuotas = dto.totalCuotas;


  return this.gastoRepository.save(gasto);
}


  findAll() {
    return this.gastoRepository.find({ relations: ['categoria'] });
  }

  async findOne(id: number) {
    const gasto = await this.gastoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
    if (!gasto) throw new NotFoundException('Gasto no encontrado');
    return gasto;
  }

  async update(id: number, dto: UpdateGastoDto) {
    const gasto = await this.gastoRepository.findOne({ where: { id } });
    if (!gasto) throw new NotFoundException('Gasto no encontrado');

    if (dto.categoriaId) {
      const categoria = await this.categoriaRepository.findOne({
        where: { id: dto.categoriaId },
      });
      if (!categoria) throw new NotFoundException('Categoría no encontrada');
      gasto.categoria = categoria;
    }

    if (dto.esCuota !== undefined) gasto.esCuota = dto.esCuota;
    if (dto.cuotaActual !== undefined) gasto.cuotaActual = dto.cuotaActual;
    if (dto.totalCuotas !== undefined) gasto.totalCuotas = dto.totalCuotas;

    Object.assign(gasto, dto);
    return this.gastoRepository.save(gasto);
  }

  async remove(id: number) {
    const gasto = await this.gastoRepository.findOne({ where: { id } });
    if (!gasto) throw new NotFoundException('Gasto no encontrado');
    return this.gastoRepository.remove(gasto);
  }
}
