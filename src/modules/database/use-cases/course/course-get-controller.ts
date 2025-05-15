import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { CourseGetUseCase } from '@/modules/database/use-cases/course/course-get-use-case';

export class CourseGetController {
  handle = async (request: Request, response: Response) => {
    const { id } = request.params;

    const result = await container.resolve(CourseGetUseCase).execute(id);

    response.status(result.statusCode).json(result);
  };
}
