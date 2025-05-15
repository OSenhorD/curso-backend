import { inject, injectable } from 'tsyringe';

import { StudentDTO } from '@/modules/database/dtos/i-student-dto';
import { IStudentRepository } from '@/modules/database/repositories/i-student-repository';

import { HttpResponse } from '@/shared/models/http.model';
import { notFound, ok, serverError } from '@/shared/helpers/http';
import { Search } from '@/shared/models/shared.model';

@injectable()
export class StudentListUseCase {
  constructor(
    @inject('StudentRepository')
    private readonly _studentRepository: IStudentRepository
  ) {}

  execute = async (search: Search): Promise<HttpResponse<StudentDTO[]>> => {
    const item = await this._studentRepository.list(search);
    if (item?.error) {
      return serverError(item?.error);
    }

    if (!item?.data) {
      return notFound(item?.error);
    }

    return ok(item.data, item?.count || 0);
  };
}
