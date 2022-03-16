import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('Facebook Api integration Tests', () => {
  it('should return a Facebook User if token is valid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret)

    const fbUser = await sut.loadUser({
      token:
        'EAAJVedZAYAzQBAGHBEZC6blpZBaZCgwCZCIOozt5xEdvj4CDDWGgY4jH7z3O7XnCeCV2UxVYdZArC1muGGOmAEfcPCewY1tBYG5LK0KofISqZBNE3WYKuLLeYtIkgAynfylSFzuoDEiBIrXUenCgbNClOrn6ern7pBDdbA0EorSMSQjUEAlQHJBiwi7MKZBp0REVZAwIbkP8FsQZDZD'
    })

    expect(fbUser).toEqual({
      facebookId: '102064145785713',
      email: 'advanced_bmpembr_testes@tfbnw.net',
      name: 'advanced node testes'
    })
  })

  it('should return undefined if token is invalid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret)

    const fbUser = await sut.loadUser({
      token: 'invalid'
    })

    expect(fbUser).toBeUndefined()
  })
})
