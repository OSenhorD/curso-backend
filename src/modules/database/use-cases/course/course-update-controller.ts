import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { CourseDTO } from '@/modules/database/dtos/i-course-dto';
import { CourseUpdateUseCase } from '@/modules/database/use-cases/course/course-update-use-case';

export class CourseUpdateController {
  handle = async (request: Request, response: Response) => {
    const { id } = request.params;
    const body = request.body as CourseDTO;

    const result = await container.resolve(CourseUpdateUseCase).execute(id, {
      nome: body?.nome || '',
      descricao: body?.descricao || '',
    });

    response.status(result.statusCode).json(result);
  };
}
