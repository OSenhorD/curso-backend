import { startConnection } from '@/shared/infra/typeorm';

const truncate = async () => {
  const connection = await startConnection();

  await connection.query(`TRUNCATE courses CASCADE`);
};

const data = async () => {
  const connection = await startConnection();

  await connection
    .query(
      `
      INSERT INTO courses (
        id, nome, descricao
      ) VALUES
        ('ecdbec25-ca70-4e53-86e1-6fa263be551f', 'Angular', '')
        , ('a5821028-fae2-4814-a843-5a26e97e982e', 'NodeJS', '')
        , ('7002b433-0529-429e-be6e-857a99035d9e', 'PHP', '')
      `
    )
    .then(() => console.log('courses ok'));

  await connection
    .query(
      `
      INSERT INTO students (
        id, nome, email, data_nascimento
      ) VALUES
        ('e5ee568e-8a62-4c7e-b816-601a70e8a503', 'Aluno 1', 'aluno_1@gmail.com', '2000-01-01')
        , ('6a73ff53-5746-4c00-b46a-b38eed6e5277', 'Aluno 2', 'aluno_2@gmail.com', '2000-01-01')
        , ('bfab6859-dcca-43dc-a1c9-08590f8c19c4', 'Aluno 3', 'aluno_3@gmail.com', '2000-01-01')
      `
    )
    .then(() => console.log('students ok'));
};

export const seedData = async () => {
  await truncate();

  console.log('Seed Data - Start');
  await data().then(() => console.log('Seed Data - OK\n'));
};
