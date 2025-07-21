import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Categoria } from '../../categorias/entities/categoria.entity';

@Entity()
export class Gasto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column('decimal')
  monto: number;

  @Column()
  fecha: string; // o usar Date si preferís

  @ManyToOne(() => Categoria, (categoria) => categoria.gastos)
  categoria: Categoria;
}
