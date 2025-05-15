import { inject, injectable } from 'tsyringe';

import { StudentDTO } from '@/modules/database/dtos/i-student-dto';
import { IStudentRepository } from '@/modules/database/repositories/i-student-repository';

import { HttpResponse } from '@/shared/models/http.model';
import { notFound, ok, serverError } from '@/shared/helpers/http';

@injectable()
export class StudentGetUseCase {
  constructor(
    @inject('StudentRepository')
    private readonly _studentRepository: IStudentRepository
  ) {}

  execute = async (id: string): Promise<HttpResponse<StudentDTO>> => {
    const item = await this._studentRepository.get(id);
    if (item?.error) {
      return serverError(item?.error);
    }

    if (!item?.data) {
      return notFound(item?.error);
    }

    return ok(item.data);
  };
}
