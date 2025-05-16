import { inject, injectable } from 'tsyringe';

import { HttpResponse } from '@/shared/models/http.model';
import { notFound, ok, serverError } from '@/shared/helpers/http';

import { ICourseRepository } from '@/modules/database/repositories/i-course-repository';

import { IStudentRepository } from '@/modules/database/repositories/i-student-repository';

import { IRegistrationRepository } from '@/modules/database/repositories/i-registration-repository';

type Body = {
  alunoId: string;
};

@injectable()
export class CourseEnrollCreateUseCase {
  constructor(
    @inject('CourseRepository')
    private readonly _courseRepository: ICourseRepository,
    @inject('StudentRepository')
    private readonly _studentRepository: IStudentRepository,
    @inject('RegistrationRepository')
    private readonly _registrationRepository: IRegistrationRepository
  ) {}

  execute = async (id: string, body: Body): Promise<HttpResponse<boolean>> => {
    const [course, student] = await Promise.all([
      this._courseRepository.get(id),
      this._studentRepository.get(body.alunoId),
    ]);
    if (course?.error) {
      return serverError(course?.error);
    }

    if (!course?.data) {
      return notFound(course?.error);
    }

    if (student?.error) {
      return serverError(student?.error);
    }

    if (!student?.data) {
      return notFound(student?.error);
    }

    const items = await this._registrationRepository.create({
      cursoId: id,
      alunoId: body.alunoId,
    });
    if (items?.error || !items?.data) {
      return serverError(items?.error);
    }

    return ok(true);
  };
}
