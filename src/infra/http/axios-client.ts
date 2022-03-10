import axios from 'axios'
import { HttpGetClient } from '@/infra/http/client'

export class AxiosHttpClient implements HttpGetClient {
  async get<T = any>({ url, params }: HttpGetClient.Params): Promise<T> {
    const result = await axios.get(url, { params })
    return result.data
  }
}
