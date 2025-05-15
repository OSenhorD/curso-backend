import { container } from 'tsyringe';

import { CourseRepository } from '@/modules/database/infra/typeorm/repositories/course-repository';
import { StudentRepository } from '@/modules/database/infra/typeorm/repositories/student-repository';

container.registerSingleton('CourseRepository', CourseRepository);
container.registerSingleton('StudentRepository', StudentRepository);
