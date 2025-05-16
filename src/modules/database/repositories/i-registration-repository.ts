import {
  RegistrationCourse,
  RegistrationDTO,
  RegistrationStudent,
} from '@/modules/database/dtos/i-registration-dto';

import { Result, Search } from '@/shared/models/shared.model';

export interface IRegistrationRepository {
  listByCourseId(
    courseId: string,
    search: Search
  ): Promise<Result<RegistrationCourse[]>>;

  listByStudentId(
    studentId: string,
    search: Search
  ): Promise<Result<RegistrationStudent[]>>;

  create(
    item: Omit<RegistrationDTO, 'id' | 'dataMatricula'>
  ): Promise<Result<RegistrationDTO>>;

  delete(id: string): Promise<Result>;
}
