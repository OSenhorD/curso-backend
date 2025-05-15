import { inject, injectable } from 'tsyringe';

import { ICourseRepository } from '@/modules/database/repositories/i-course-repository';

import { HttpResponse } from '@/shared/models/http.model';
import { notFound, ok, serverError } from '@/shared/helpers/http';

@injectable()
export class CourseDeleteUseCase {
  constructor(
    @inject('CourseRepository')
    private readonly _courseRepository: ICourseRepository
  ) {}

  execute = async (id: string): Promise<HttpResponse> => {
    const item = await this._courseRepository.get(id);
    if (item?.error) {
      return serverError(item?.error);
    }

    if (!item?.data) {
      return notFound(item?.error);
    }

    const itemDelete = await this._courseRepository.delete(id);
    if (itemDelete?.error) {
      return serverError(itemDelete?.error);
    }

    return ok(itemDelete);
  };
}
