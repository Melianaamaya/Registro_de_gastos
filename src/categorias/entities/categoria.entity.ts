import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Gasto } from '../../gastos/entities/gasto.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Gasto, (gasto) => gasto.categoria)
  gastos: Gasto[];
}
