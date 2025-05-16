export type RegistrationDTO = {
  id: string;
  cursoId: string;
  alunoId: string;
  dataMatricula: string;
};

export type RegistrationGet = {
  id: string;
  cursoId: string;
  cursoNome: string;
  alunoNome: string;
  alunoEmail: string;
  dataMatricula: string;
};

export type RegistrationCreate = {
  alunoId: string;
};
