import { startConnection } from '@/shared/infra/typeorm';

const truncate = async () => {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const connection = await startConnection();
};

const data = async () => {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const connection = await startConnection();
};

export const seedData = async () => {
  await truncate();

  console.log('Seed Data - Start');
  await data().then(() => console.log('Seed Data - OK\n'));
};
