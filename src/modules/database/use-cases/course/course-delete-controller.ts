import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { CourseDeleteUseCase } from '@/modules/database/use-cases/course/course-delete-use-case';

export class CourseDeleteController {
  handle = async (request: Request, response: Response) => {
    const { id } = request.params;

    const result = await container.resolve(CourseDeleteUseCase).execute(id);

    response.status(result.statusCode).json(result);
  };
}
