import { Router } from 'express';

import databaseRoutes from '@/shared/infra/http/routes/database';

const router = Router();

router.use('/database', databaseRoutes);

export default router;
