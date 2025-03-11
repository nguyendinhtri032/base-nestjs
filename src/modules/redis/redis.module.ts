import { Module, Global } from '@nestjs/common'
import { RedisService } from './redis.service'
import { ConfigCacheRedisSource, ConfigIORedisSource } from 'src/configs/redis.config'
import { CacheModule } from '@nestjs/cache-manager'
import { RedisModule as RedisModuleNest } from '@nestjs-modules/ioredis'

@Global()
@Module({
  imports: [
    CacheModule.register(ConfigCacheRedisSource),
    RedisModuleNest.forRoot(ConfigIORedisSource)
  ],
  providers: [
    RedisService
  ],
  exports: [RedisService],
})
export class RedisModule {}
