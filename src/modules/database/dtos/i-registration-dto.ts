export type RegistrationDTO = {
  id: string;
  cursoId: string;
  alunoId: string;
  dataMatricula: string;
};

export type RegistrationCourse = {
  id: string;
  alunoNome: string;
  alunoEmail: string;
  dataMatricula: string;
};

export type RegistrationStudent = {
  id: string;
  courseId: string;
  courseNome: string;
  courseDescricao: string;
};
