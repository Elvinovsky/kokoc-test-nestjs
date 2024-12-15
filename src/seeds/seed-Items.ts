import { Item } from '../items/entities/item.entity';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';

export const seedItem = async (dataSource: DataSource) => {
  const repository = dataSource.getRepository(Item);

  const items = Array.from({ length: 1000 }, () => ({
    title: faker.lorem.sentence(3),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }));

  await repository.save(items); // Batch insertion

  console.log('Seeded 1000 examples!');
};
