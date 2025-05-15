import { Router } from 'express';

import databaseCompanyRoutes from '@/shared/infra/http/routes/database/course-routes';

const databaseRoutes = Router();

databaseRoutes.use('/course', databaseCompanyRoutes);

export default databaseRoutes;
