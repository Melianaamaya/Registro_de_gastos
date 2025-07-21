import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasModule } from './categorias/categorias.module';
import { GastosModule } from './gastos/gastos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', 
      password: '', 
      database: 'gastos_db',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    CategoriasModule,
    GastosModule,
  ],
})
export class AppModule {}
