import { DataSource } from 'typeorm'
import { resolve } from 'path'
import { SERVER_CONFIG } from './server.config'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: SERVER_CONFIG.DB_HOST,
  port: SERVER_CONFIG.DB_PORT,
  username: SERVER_CONFIG.DB_USERNAME,
  password: SERVER_CONFIG.DB_PASSWORD,
  database: SERVER_CONFIG.DB_NAME,
  entities: [resolve('dist/modules/**/entities/*.entity.js')],
  migrations: [resolve('dist/migrations/*.js')],
  synchronize: SERVER_CONFIG.APP_ENV === 'development',
  logging: SERVER_CONFIG.APP_ENV === 'development',
  migrationsRun: SERVER_CONFIG.APP_ENV === 'development',
})

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })
