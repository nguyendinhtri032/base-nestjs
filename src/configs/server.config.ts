import { config } from 'dotenv'
config()

export const SERVER_CONFIG = Object.freeze({
  APP_PORT: process.env.APP_PORT || 4400,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_USERNAME: process.env.DB_USERNAME || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  APP_ENV: process.env.APP_ENV || 'development',
  SMS_API_URL: process.env.SMS_API_URL || '',
  AUTHORIZATION_KEY: process.env.AUTHORIZATION_KEY || '',
  FTP_HOST: process.env.FTP_HOST || '',
  FTP_USERNAME: process.env.FTP_USERNAME || '',
  FTP_PASSWORD: process.env.FTP_PASSWORD || '',
  API_PREFIX_V1: process.env.API_PREFIX_V1 || '',
  VOUCHER_API_URL: process.env.VOUCHER_API_URL || '',
  DEFAULT_LANG: process.env.DEFAULT_LANG || 'en',
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || '',
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID || '',
  TELEGRAM_BOT_URL: process.env.TELEGRAM_BOT_URL || ''
});
