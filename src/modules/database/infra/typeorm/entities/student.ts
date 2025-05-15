import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'nome' })
  nome!: string;

  @Column({ name: 'email' })
  email!: string;

  @Column({ name: 'data_nascimento' })
  dataNascimento!: string;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt?: Date;
}
