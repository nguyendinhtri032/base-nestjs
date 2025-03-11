import { Injectable, Inject } from '@nestjs/common'
import { Cache } from 'cache-manager'
import Redis from 'ioredis'
import { InjectRedis } from '@nestjs-modules/ioredis'
import { SERVER_CONFIG } from 'src/configs/server.config'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
@Injectable()
export class RedisService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRedis() private readonly redisClient: Redis
  ) {
    this.checkConnection()
  }

  async checkConnection() {
    await this.redisClient.ping()
  }

  async getData(key: string): Promise<any> {
    return await this.cacheManager.get(key)
  }

  async setData(key: string, value: any, ttl: number = SERVER_CONFIG.REDIS.CACHE_TTL): Promise<any> {
    await this.cacheManager.set(key, value, ttl)
  }

  async delData(key: string): Promise<void> {
    await this.cacheManager.del(key)
  }
}