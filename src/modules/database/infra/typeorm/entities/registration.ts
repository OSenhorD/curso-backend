import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Course } from '@/modules/database/infra/typeorm/entities/course';
import { Student } from '@/modules/database/infra/typeorm/entities/student';

@Entity('registrations')
export class Registration {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Course, { nullable: false, eager: true })
  @JoinColumn({ name: 'curso_id', referencedColumnName: 'id' })
  cursoId!: string;

  @ManyToOne(() => Student, { nullable: false, eager: true })
  @JoinColumn({ name: 'aluno_id', referencedColumnName: 'id' })
  alunoId!: string;

  @Column({ name: 'data_matricula' })
  dataMatricula!: string;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt?: Date;
}
