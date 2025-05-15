import { inject, injectable } from 'tsyringe';

import { CourseDTO } from '@/modules/database/dtos/i-course-dto';
import { ICourseRepository } from '@/modules/database/repositories/i-course-repository';

import { HttpResponse } from '@/shared/models/http.model';
import { ok, serverError } from '@/shared/helpers/http';

@injectable()
export class CourseCreateUseCase {
  constructor(
    @inject('CourseRepository')
    private readonly _courseRepository: ICourseRepository
  ) {}

  execute = async (
    body: Omit<CourseDTO, 'id'>
  ): Promise<HttpResponse<CourseDTO>> => {
    const item = await this._courseRepository.create(body);
    if (item?.error || !item?.data) {
      return serverError(item?.error);
    }

    return ok(item.data);
  };
}
