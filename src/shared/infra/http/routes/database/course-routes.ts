import { Router } from 'express';

import { CourseEnrollListController } from '@/modules/database/use-cases/course/course-enroll-list-controller';
import { CourseGetController } from '@/modules/database/use-cases/course/course-get-controller';
import { CourseListController } from '@/modules/database/use-cases/course/course-list-controller';
import { CourseEnrollCreateController } from '@/modules/database/use-cases/course/course-enroll-create-controller';
import { CourseCreateController } from '@/modules/database/use-cases/course/course-create-controller';
import { CourseUpdateController } from '@/modules/database/use-cases/course/course-update-controller';
import { CourseDeleteController } from '@/modules/database/use-cases/course/course-delete-controller';

const databaseCourseRoutes = Router();

databaseCourseRoutes.get(
  '/:id/enroll',
  new CourseEnrollListController().handle
);
databaseCourseRoutes.get('/:id', new CourseGetController().handle);
databaseCourseRoutes.get('/', new CourseListController().handle);
databaseCourseRoutes.post(
  '/:id/enroll',
  new CourseEnrollCreateController().handle
);
databaseCourseRoutes.post('/', new CourseCreateController().handle);
databaseCourseRoutes.put('/:id', new CourseUpdateController().handle);
databaseCourseRoutes.delete('/:id', new CourseDeleteController().handle);

export default databaseCourseRoutes;
