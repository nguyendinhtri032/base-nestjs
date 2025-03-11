import { config } from 'dotenv'
config()

export const SERVER_CONFIG = Object.freeze({
  APP_PORT: process.env.APP_PORT || 4400,
  DB: {
    HOST: process.env.DB_HOST || 'localhost',
    PORT: Number(process.env.DB_PORT) || 3306,
    USERNAME: process.env.DB_USERNAME || 'root',
    PASSWORD: process.env.DB_PASSWORD,
    NAME: process.env.DB_NAME,
  },
  APP_ENV: process.env.APP_ENV || 'development',
  FTP: {
    HOST: process.env.FTP_HOST || '',
    USERNAME: process.env.FTP_USERNAME || '',
    PASSWORD: process.env.FTP_PASSWORD || '',
  },
  API_PREFIX_V1: process.env.API_PREFIX_V1 || 'api/v1',
  DEFAULT_LANG: process.env.DEFAULT_LANG || 'en',
  SMTP: {
    HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
    PORT: Number(process.env.SMTP_PORT) || 587,
    USER: process.env.SMTP_USER || '',
    PASSWORD: process.env.SMTP_PASSWORD || '',
  },
  REDIS: {
    HOST: process.env.REDIS_HOST || 'localhost',
    PORT: Number(process.env.REDIS_PORT) || 6379,
    USERNAME: process.env.REDIS_USERNAME || '',
    PASSWORD: process.env.REDIS_PASSWORD || '',
    CACHE_TTL: Number(process.env.REDIS_CACHE_TTL) || 300000, //5 minutes
    CACHE_MAX: Number(process.env.REDIS_CACHE_MAX) || 100,
    DB: Number(process.env.REDIS_DB) || 0,
  },
  AWS: {
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
    REGION: process.env.AWS_REGION || '',
    PROFILE: process.env.AWS_PROFILE || '',
    BUCKET: process.env.AWS_BUCKET || '',
  }
})
