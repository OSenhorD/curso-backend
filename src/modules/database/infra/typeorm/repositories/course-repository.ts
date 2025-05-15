import { Brackets } from 'typeorm';

import { Course } from '@/modules/database/infra/typeorm/entities/course';
import { ICourseRepository } from '@/modules/database/repositories/i-course-repository';

import { CourseDTO } from '@/modules/database/dtos/i-course-dto';

import AppDataSource from '@/shared/infra/typeorm';

import { Result, Search } from '@/shared/models/shared.model';

export class CourseRepository implements ICourseRepository {
  private readonly _repository = AppDataSource.getRepository(Course);

  list = async ({
    search,
    page,
    pageSize,
  }: Search): Promise<Result<CourseDTO[]>> => {
    try {
      let query = this._repository
        .createQueryBuilder('course')
        .select([
          `course.id as "id"`,
          `course.nome as "nome"`,
          `course.descricao as "descricao"`,
        ]);

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

  get = async (id: string): Promise<Result<CourseDTO>> => {
    try {
      const item = await this._repository
        .createQueryBuilder('course')
        .select([
          `course.id as "id"`,
          `course.nome as "nome"`,
          `course.descricao as "descricao"`,
        ])
        .where('course.id = :id', { id })
        .getRawOne();

      if (typeof item === 'undefined') {
        return {
          data: null,
        };
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

  create = async (item: CourseDTO): Promise<Result<CourseDTO>> => {
    try {
      const newItem = this._repository.create({
        nome: item?.nome,
        descricao: item?.descricao,
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
    item: Omit<CourseDTO, 'id'>
  ): Promise<Result<CourseDTO>> => {
    try {
      const newItem = this._repository.create({
        id,
        nome: item?.nome,
        descricao: item?.descricao,
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
