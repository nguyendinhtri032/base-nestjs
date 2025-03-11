import { BullRootModuleOptions } from '@nestjs/bull'
import { SERVER_CONFIG } from './server.config'
import { CacheModuleOptions } from '@nestjs/cache-manager'
import { RedisModuleOptions } from '@nestjs-modules/ioredis'
import { redisStore } from 'cache-manager-redis-store'

export const BullRedisSource: BullRootModuleOptions = {
  redis: {
    host: SERVER_CONFIG.REDIS.HOST,
    port: SERVER_CONFIG.REDIS.PORT
  }
}

export const ConfigCacheRedisSource: CacheModuleOptions = {
  useFactory: () => {
    return {
      store: redisStore,
      isGlobal: true,
      host: SERVER_CONFIG.REDIS.HOST,
      port: SERVER_CONFIG.REDIS.PORT,
      ttl: SERVER_CONFIG.REDIS.CACHE_TTL,
      max: SERVER_CONFIG.REDIS.CACHE_MAX,
      username: SERVER_CONFIG.REDIS.USERNAME,
      password: SERVER_CONFIG.REDIS.PASSWORD,
      db: SERVER_CONFIG.REDIS.DB,
    }
  },
}

export const ConfigIORedisSource: RedisModuleOptions = {
  type: 'single',
  url: `redis://${SERVER_CONFIG.REDIS.HOST}:${SERVER_CONFIG.REDIS.PORT}`,
  options: {
    username: SERVER_CONFIG.REDIS.USERNAME,
    password: SERVER_CONFIG.REDIS.PASSWORD,
    db: SERVER_CONFIG.REDIS.DB,
  }
}