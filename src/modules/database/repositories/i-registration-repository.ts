import {
  RegistrationDTO,
  RegistrationGet,
} from '@/modules/database/dtos/i-registration-dto';

import { Result, Search } from '@/shared/models/shared.model';

export interface IRegistrationRepository {
  listByCourseId(
    courseId: string,
    search: Search
  ): Promise<Result<RegistrationGet[]>>;

  listByStudentId(
    studentId: string,
    search: Search
  ): Promise<Result<RegistrationGet[]>>;

  create(item: Omit<RegistrationDTO, 'id'>): Promise<Result<RegistrationDTO>>;

  delete(id: string): Promise<Result>;
}
