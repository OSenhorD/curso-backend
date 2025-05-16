import { Brackets } from 'typeorm';

import { Registration } from '@/modules/database/infra/typeorm/entities/registration';
import { IRegistrationRepository } from '@/modules/database/repositories/i-registration-repository';

import {
  RegistrationCourse,
  RegistrationDTO,
  RegistrationStudent,
} from '@/modules/database/dtos/i-registration-dto';

import AppDataSource from '@/shared/infra/typeorm';

import { Result, Search } from '@/shared/models/shared.model';

export class RegistrationRepository implements IRegistrationRepository {
  private readonly _repository = AppDataSource.getRepository(Registration);

  listByCourseId = async (
    courseId: string,
    { page, pageSize, search }: Search
  ): Promise<Result<RegistrationCourse[]>> => {
    try {
      let query = this._repository
        .createQueryBuilder('registration')
        .select([
          `registration.id as "id"`,
          `student.id as "alunoNome"`,
          `student.nome as "alunoEmail"`,
          `registration.dataMatricula as "dataMatricula"`,
        ])
        .leftJoin('courses', 'course', 'course.id = registration.cursoId')
        .leftJoin('students', 'student', 'student.id = registration.alunoId')
        .where('course.id = :courseId', { courseId });

      if (search) {
        query = query.andWhere(
          new Brackets(qb => {
            qb.where('CAST(student.nome AS VARCHAR) ilike :search', {
              search: `%${search}%`,
            });
          })
        );
      }

      const count = await query.getCount();

      query = query.addOrderBy('student.nome', 'ASC');
      query = query.offset(pageSize * page).limit(pageSize);

      const items = await query.getRawMany();

      return { data: items, count };
    } catch (error) {
      return {
        data: null,
        count: 0,
        error: (error as Error)?.message,
      };
    }
  };

  listByStudentId = async (
    studentId: string,
    { page, pageSize, search }: Search
  ): Promise<Result<RegistrationStudent[]>> => {
    try {
      let query = this._repository
        .createQueryBuilder('registration')
        .select([
          `registration.id as "id"`,
          `course.id as "courseId"`,
          `course.nome as "courseNome"`,
          `course.descricao as "courseDescricao"`,
          `registration.dataMatricula as "dataMatricula"`,
        ])
        .leftJoin('courses', 'course', 'course.id = registration.cursoId')
        .leftJoin('students', 'student', 'student.id = registration.alunoId')
        .where('student.id = :studentId', { studentId });

      if (search) {
        query = query.andWhere(
          new Brackets(qb => {
            qb.where('CAST(course.nome AS VARCHAR) ilike :search', {
              search: `%${search}%`,
            });
          })
        );
      }

      const count = await query.getCount();

      query = query.addOrderBy('course.nome', 'ASC');
      query = query.offset(pageSize * page).limit(pageSize);

      const items = await query.getRawMany();

      return { data: items, count };
    } catch (error) {
      return {
        data: null,
        count: 0,
        error: (error as Error)?.message,
      };
    }
  };

  create = async (item: RegistrationDTO): Promise<Result<RegistrationDTO>> => {
    try {
      const newItem = this._repository.create({
        alunoId: item?.alunoId,
        cursoId: item?.cursoId,
      });

      const result = await this._repository.save(newItem);

      return {
        data: result,
      };
    } catch (error) {
      return {
        data: null,
        error: (error as Error)?.message,
      };
    }
  };

  delete = async (id: string): Promise<Result> => {
    try {
      await this._repository.delete(id);

      return { data: null };
    } catch (error) {
      return {
        data: null,
        error: (error as Error)?.message,
      };
    }
  };
}
