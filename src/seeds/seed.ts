import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Order } from '../orders/entities/order.entity';

// type for the orders array
type OrderSeed = {
  product: { id: number };
  quantity: number;
};

// Initialize the DataSource
const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'mysql',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER || 'nest',
  password: process.env.DB_PASSWORD || 'nest',
  database: process.env.DB_NAME || 'nest_perf',
  entities: [Product, Order],
  synchronize: true,
});

export async function seed() {
  console.log('Initializing database connection...');
  await dataSource.initialize();

  console.log('Seeding products...');
  const products = Array.from({ length: 100 }, (_, i) => ({
    name: `Product ${i + 1}`,
    price: parseFloat((Math.random() * 100).toFixed(2)),
  }));
  await dataSource.getRepository(Product).save(products);

  console.log('Seeding orders...');
  const orders: OrderSeed[] = [];
  for (let i = 0; i < 10_000; i++) {
    orders.push({
      product: { id: Math.floor(Math.random() * 100) + 1 },
      quantity: Math.floor(Math.random() * 10) + 1,
    });
  }
  const data = await dataSource.getRepository(Order).save(orders);
  console.log('Saving orders...', data);

  console.log('Database seeded successfully!');

  console.log('Closing database connection...');
  await dataSource.destroy();
}

seed().catch((error) => {
  console.error('Error during seeding:', error);
});