import { Router } from 'express';

import { StudentGetController } from '@/modules/database/use-cases/student/student-get-controller';
import { StudentListController } from '@/modules/database/use-cases/student/student-list-controller';
import { StudentCreateController } from '@/modules/database/use-cases/student/student-create-controller';
import { StudentUpdateController } from '@/modules/database/use-cases/student/student-update-controller';
import { StudentDeleteController } from '@/modules/database/use-cases/student/student-delete-controller';

const databaseStudentRoutes = Router();

databaseStudentRoutes.get('/:id', new StudentGetController().handle);
databaseStudentRoutes.get('/', new StudentListController().handle);
databaseStudentRoutes.post('/', new StudentCreateController().handle);
databaseStudentRoutes.put('/:id', new StudentUpdateController().handle);
databaseStudentRoutes.delete('/:id', new StudentDeleteController().handle);

export default databaseStudentRoutes;
