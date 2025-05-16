import { inject, injectable } from 'tsyringe';

import { HttpResponse } from '@/shared/models/http.model';
import { notFound, ok, serverError } from '@/shared/helpers/http';
import { Search } from '@/shared/models/shared.model';

import { IStudentRepository } from '@/modules/database/repositories/i-student-repository';

import { RegistrationStudent } from '@/modules/database/dtos/i-registration-dto';
import { IRegistrationRepository } from '@/modules/database/repositories/i-registration-repository';

@injectable()
export class StudentEnrollListUseCase {
  constructor(
    @inject('StudentRepository')
    private readonly _studentRepository: IStudentRepository,
    @inject('RegistrationRepository')
    private readonly _registrationRepository: IRegistrationRepository
  ) {}

  execute = async (
    id: string,
    search: Search
  ): Promise<HttpResponse<RegistrationStudent[]>> => {
    const item = await this._studentRepository.get(id);
    if (item?.error) {
      return serverError(item?.error);
    }

    if (!item?.data) {
      return notFound(item?.error);
    }

    const items = await this._registrationRepository.listByStudentId(
      id,
      search
    );
    if (items?.error || !items?.data) {
      return serverError(items?.error);
    }

    return ok(items.data, items?.count || 0);
  };
}
