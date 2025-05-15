import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { Params } from '@/shared/models/shared.model';

import { CourseListUseCase } from '@/modules/database/use-cases/course/course-list-use-case';

export class CourseListController {
  handle = async (request: Request, response: Response) => {
    const { search, page, pageSize } = request.query as Params;

    const result = await container.resolve(CourseListUseCase).execute({
      search: search as string,
      page: Number(page || 0),
      pageSize: Number(pageSize || 15),
    });

    response.status(result.statusCode).json(result);
  };
}
