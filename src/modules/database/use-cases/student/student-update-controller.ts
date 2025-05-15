import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { StudentDTO } from '@/modules/database/dtos/i-student-dto';
import { StudentUpdateUseCase } from '@/modules/database/use-cases/student/student-update-use-case';

export class StudentUpdateController {
  handle = async (request: Request, response: Response) => {
    const { id } = request.params;
    const body = request.body as StudentDTO;

    const result = await container.resolve(StudentUpdateUseCase).execute(id, {
      nome: body?.nome || '',
      email: body?.email,
      dataNascimento: body?.dataNascimento,
    });

    response.status(result.statusCode).json(result);
  };
}
