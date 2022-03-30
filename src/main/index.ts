import './config/module-alias'
import 'reflect-metadata'
import { app } from '@/main/config/app'
import { env } from '@/main/config/env'
import { createConnection } from 'typeorm'

createConnection()
  .then(() => app.listen(env.port, () => console.log(`Server Running in ${env.port}`)))
  .catch(console.error)
