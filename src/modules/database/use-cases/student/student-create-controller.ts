import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { StudentDTO } from '@/modules/database/dtos/i-student-dto';
import { StudentCreateUseCase } from '@/modules/database/use-cases/student/student-create-use-case';

export class StudentCreateController {
  handle = async (request: Request, response: Response) => {
    const body = request.body as StudentDTO;

    const result = await container.resolve(StudentCreateUseCase).execute({
      nome: body?.nome || '',
      email: body?.email,
      dataNascimento: body?.dataNascimento,
    });

    response.status(result.statusCode).json(result);
  };
}
