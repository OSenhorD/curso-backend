import { container } from 'tsyringe';

import { CourseRepository } from '@/modules/database/infra/typeorm/repositories/course-repository';

container.registerSingleton('CourseRepository', CourseRepository);
