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
};

export const seedData = async () => {
  await truncate();

  console.log('Seed Data - Start');
  await data().then(() => console.log('Seed Data - OK\n'));
};
