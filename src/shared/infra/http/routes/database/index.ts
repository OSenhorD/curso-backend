import { Router } from 'express';

import databaseCourseRoutes from '@/shared/infra/http/routes/database/course-routes';
import databaseStudentRoutes from '@/shared/infra/http/routes/database/student-routes';

const databaseRoutes = Router();

databaseRoutes.use('/course', databaseCourseRoutes);
databaseRoutes.use('/student', databaseStudentRoutes);

export default databaseRoutes;
