import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../orders/entities/order.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getTopSellingProducts() {
    return this.orderRepository
    .createQueryBuilder('order')
    .select('product.id', 'productId')
    .addSelect('product.name', 'name')
    .addSelect('SUM(order.quantity)', 'totalSales')
    .leftJoin('order.product', 'product')
    .groupBy('product.id')
    .orderBy('SUM(order.quantity)', 'DESC')
    .limit(10)
    .getRawMany();
  }
}