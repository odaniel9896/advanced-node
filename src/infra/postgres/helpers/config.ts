import { ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'ruby.db.elephantsql.com',
  port: 5432,
  username: 'dnwqjbam',
  database: 'dnwqjbam',
  password: 'ErpwPpoxch7OygADKdXJ1NawwrxA93vB',
  entities: ['dist/infra/postgres/entities/index.js']
}
