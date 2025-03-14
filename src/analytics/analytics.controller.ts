import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { RedisService } from '../redis/redis.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly redisService: RedisService, // Inject RedisService
  ) {}

  @Get('top-products')
  async getTopSellingProducts() {
    const cacheKey = 'top-selling-products';
    const cachedData = await this.redisService.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const topProducts = await this.analyticsService.getTopSellingProducts();
    await this.redisService.set(cacheKey, JSON.stringify(topProducts), 60);
    return topProducts;
  }
}