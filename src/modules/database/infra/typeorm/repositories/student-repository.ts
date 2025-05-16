import { Brackets } from 'typeorm';

import { Student } from '@/modules/database/infra/typeorm/entities/student';
import { IStudentRepository } from '@/modules/database/repositories/i-student-repository';

import { StudentDTO } from '@/modules/database/dtos/i-student-dto';

import AppDataSource from '@/shared/infra/typeorm';

import { Result, Search } from '@/shared/models/shared.model';

export class StudentRepository implements IStudentRepository {
  private readonly _repository = AppDataSource.getRepository(Student);

  list = async ({
    search,
    page,
    pageSize,
  }: Search): Promise<Result<StudentDTO[]>> => {
    try {
      let query = this._repository
        .createQueryBuilder('student')
        .select([
          `student.id as "id"`,
          `student.nome as "nome"`,
          `student.email as "email"`,
          `student.dataNascimento as "dataNascimento"`,
        ]);

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

  get = async (id: string): Promise<Result<StudentDTO>> => {
    try {
      const item = await this._repository
        .createQueryBuilder('student')
        .select([
          `student.id as "id"`,
          `student.nome as "nome"`,
          `student.email as "email"`,
          `student.dataNascimento as "dataNascimento"`,
        ])
        .where('student.id = :id', { id })
        .getRawOne();

      if (typeof item === 'undefined') {
        throw new Error('Not found');
      }

      return {
        data: item,
      };
    } catch (error) {
      return {
        data: null,
        error: (error as Error)?.message,
      };
    }
  };

  create = async (item: StudentDTO): Promise<Result<StudentDTO>> => {
    try {
      const newItem = this._repository.create({
        nome: item?.nome,
        email: item?.email,
        dataNascimento: item?.dataNascimento,
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

  update = async (
    id: string,
    item: Omit<StudentDTO, 'id'>
  ): Promise<Result<StudentDTO>> => {
    try {
      const newItem = this._repository.create({
        id,
        nome: item?.nome,
        email: item?.email,
        dataNascimento: item?.dataNascimento,
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
