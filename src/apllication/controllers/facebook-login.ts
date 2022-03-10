import { HttpResponse, badRequest, unauthorized } from '@/apllication/helpers'
import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { ServerError, RequiredFieldError } from '@/apllication/errors'

export class FacebookLoginController {
  constructor(private readonly facebookAuthentication: FacebookAuthentication) {}
  async handle(httpRequest: any): Promise<HttpResponse> {
    try {
      if (!httpRequest.token) return badRequest(new RequiredFieldError('token'))

      const accessToken = await this.facebookAuthentication.perform({
        token: httpRequest.token
      })
      if (accessToken instanceof AccessToken) {
        return {
          statusCode: 200,
          data: {
            accessToken: accessToken.value
          }
        }
      }
      return unauthorized()
    } catch (error) {
      return {
        statusCode: 500,
        data: new ServerError(error)
      }
    }
  }
}
