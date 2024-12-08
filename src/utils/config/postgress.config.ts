import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const postgressConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  database: 'postgres',
  password: 'senhaPostgres',
  autoLoadEntities: true, // Carrega as entities
  synchronize: true, // Synchronizes schema - not recommended for production
};
