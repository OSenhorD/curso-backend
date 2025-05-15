import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { StudentGetUseCase } from '@/modules/database/use-cases/student/student-get-use-case';

export class StudentGetController {
  handle = async (request: Request, response: Response) => {
    const { id } = request.params;

    const result = await container.resolve(StudentGetUseCase).execute(id);

    response.status(result.statusCode).json(result);
  };
}
