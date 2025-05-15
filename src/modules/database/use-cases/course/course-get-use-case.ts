import { inject, injectable } from 'tsyringe';

import { CourseDTO } from '@/modules/database/dtos/i-course-dto';
import { ICourseRepository } from '@/modules/database/repositories/i-course-repository';

import { HttpResponse } from '@/shared/models/http.model';
import { notFound, ok, serverError } from '@/shared/helpers/http';

@injectable()
export class CourseGetUseCase {
  constructor(
    @inject('CourseRepository')
    private readonly _courseRepository: ICourseRepository
  ) {}

  execute = async (id: string): Promise<HttpResponse<CourseDTO>> => {
    const item = await this._courseRepository.get(id);
    if (item?.error) {
      return serverError(item?.error);
    }

    if (!item?.data) {
      return notFound(item?.error);
    }

    return ok(item.data);
  };
}
