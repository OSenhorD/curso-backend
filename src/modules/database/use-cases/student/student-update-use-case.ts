import { inject, injectable } from 'tsyringe';

import { StudentDTO } from '@/modules/database/dtos/i-student-dto';
import { IStudentRepository } from '@/modules/database/repositories/i-student-repository';

import { HttpResponse } from '@/shared/models/http.model';
import { ok, serverError } from '@/shared/helpers/http';

@injectable()
export class StudentUpdateUseCase {
  constructor(
    @inject('StudentRepository')
    private readonly _studentRepository: IStudentRepository
  ) {}

  execute = async (
    id: string,
    body: Omit<StudentDTO, 'id'>
  ): Promise<HttpResponse<StudentDTO>> => {
    const item = await this._studentRepository.update(id, body);
    if (item?.error || !item?.data) {
      return serverError(item?.error);
    }

    return ok(item.data);
  };
}
