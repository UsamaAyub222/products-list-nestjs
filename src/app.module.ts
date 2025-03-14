import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { Order } from './orders/entities/order.entity';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'mysql',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER || 'nest',
      password: process.env.DB_PASSWORD || 'nest',
      database: process.env.DB_NAME || 'nest_perf',
      entities: [Product, Order],
      synchronize: true,
    }),
    ProductsModule,
    OrdersModule,
    AnalyticsModule,
    RedisModule,
  ],
})
export class AppModule {}