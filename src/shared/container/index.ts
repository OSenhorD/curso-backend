import { container } from 'tsyringe';

import { CourseRepository } from '@/modules/database/infra/typeorm/repositories/course-repository';
import { StudentRepository } from '@/modules/database/infra/typeorm/repositories/student-repository';
import { RegistrationRepository } from '@/modules/database/infra/typeorm/repositories/registration-repository';

container.registerSingleton('CourseRepository', CourseRepository);
container.registerSingleton('StudentRepository', StudentRepository);
container.registerSingleton('RegistrationRepository', RegistrationRepository);
