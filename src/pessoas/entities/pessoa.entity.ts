import { IsEmail } from 'class-validator';
import { Recado } from 'src/recados/entities/recado.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 100 })
  passwordHash: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  //uma pessoa pode ter enviado muitos recados (como "de")
  //Esses recados sao relacionados ao campo "de" na entidade recado
  @OneToMany(() => Recado, recado => recado.de)
  recadosEnviados: Recado[];

  //uma pessoa pode ter recebido muitos recados (como "para")
  //Esses recados sao relacionados ao campo "para" na entidade recado
  @OneToMany(() => Recado, recado => recado.para)
  recadosRecebidos: Recado[];
}
