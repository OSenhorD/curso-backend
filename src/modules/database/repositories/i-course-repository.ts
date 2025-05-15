import { CourseDTO } from '@/modules/database/dtos/i-course-dto';

import { Result, Search } from '@/shared/models/shared.model';

export interface ICourseRepository {
  list(search: Search): Promise<Result<CourseDTO[]>>;

  get(id: string): Promise<Result<CourseDTO>>;

  create(item: Omit<CourseDTO, 'id'>): Promise<Result<CourseDTO>>;

  update(id: string, item: Omit<CourseDTO, 'id'>): Promise<Result<CourseDTO>>;

  delete(id: string): Promise<Result>;
}
