import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { CourseDTO } from '@/modules/database/dtos/i-course-dto';
import { CourseCreateUseCase } from '@/modules/database/use-cases/course/course-create-use-case';

export class CourseCreateController {
  handle = async (request: Request, response: Response) => {
    const body = request.body as CourseDTO;

    const result = await container.resolve(CourseCreateUseCase).execute({
      nome: body?.nome || '',
      descricao: body?.descricao || '',
    });

    response.status(result.statusCode).json(result);
  };
}
