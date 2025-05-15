import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { StudentDeleteUseCase } from '@/modules/database/use-cases/student/student-delete-use-case';

export class StudentDeleteController {
  handle = async (request: Request, response: Response) => {
    const { id } = request.params;

    const result = await container.resolve(StudentDeleteUseCase).execute(id);

    response.status(result.statusCode).json(result);
  };
}
