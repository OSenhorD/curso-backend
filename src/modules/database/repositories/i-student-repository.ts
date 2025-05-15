import { StudentDTO } from '@/modules/database/dtos/i-student-dto';

import { Result, Search } from '@/shared/models/shared.model';

export interface IStudentRepository {
  list(search: Search): Promise<Result<StudentDTO[]>>;

  get(id: string): Promise<Result<StudentDTO>>;

  create(item: Omit<StudentDTO, 'id'>): Promise<Result<StudentDTO>>;

  update(id: string, item: Omit<StudentDTO, 'id'>): Promise<Result<StudentDTO>>;

  delete(id: string): Promise<Result>;
}
