import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { isUUID } from '@/shared/utils/utils';

import { CourseEnrollCreateUseCase } from '@/modules/database/use-cases/course/course-enroll-create-use-case';

export class CourseEnrollCreateController {
  handle = async (request: Request, response: Response) => {
    const { id } = request.params;
    const body = request.body;

    const result = await container
      .resolve(CourseEnrollCreateUseCase)
      .execute(id, {
        alunoId: isUUID(body?.aluno_id) ? body?.aluno_id : '',
      });

    response.status(result.statusCode).json(result);
  };
}
