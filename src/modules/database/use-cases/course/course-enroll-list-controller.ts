import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { Params } from '@/shared/models/shared.model';

import { CourseEnrollListUseCase } from '@/modules/database/use-cases/course/course-enroll-list-use-case';

export class CourseEnrollListController {
  handle = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { search, page, pageSize } = request.query as Params;

    const result = await container
      .resolve(CourseEnrollListUseCase)
      .execute(id, {
        search: search as string,
        page: Number(page || 0),
        pageSize: Number(pageSize || 15),
      });

    response.status(result.statusCode).json(result);
  };
}
