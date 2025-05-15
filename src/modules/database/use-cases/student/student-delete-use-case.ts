import { inject, injectable } from 'tsyringe';

import { IStudentRepository } from '@/modules/database/repositories/i-student-repository';

import { HttpResponse } from '@/shared/models/http.model';
import { notFound, ok, serverError } from '@/shared/helpers/http';

@injectable()
export class StudentDeleteUseCase {
  constructor(
    @inject('StudentRepository')
    private readonly _studentRepository: IStudentRepository
  ) {}

  execute = async (id: string): Promise<HttpResponse> => {
    const item = await this._studentRepository.get(id);
    if (item?.error) {
      return serverError(item?.error);
    }

    if (!item?.data) {
      return notFound(item?.error);
    }

    const itemDelete = await this._studentRepository.delete(id);
    if (itemDelete?.error) {
      return serverError(itemDelete?.error);
    }

    return ok(itemDelete);
  };
}
