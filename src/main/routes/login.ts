import { adaptExpressRoute as adapt } from '@/infra/http'
import { Router } from 'express'
import { makeFacebookLoginController } from '@/main/factories/controllers'

export default (router: Router): void => {
  router.post('/login/facebook', adapt(makeFacebookLoginController()))
}
