import { TokenGenerator } from '@/data/contracts/crypto'
import { sign } from 'jsonwebtoken'

type Params = TokenGenerator.Params
type Result = TokenGenerator.Result
export class JwtTokenGenerator implements TokenGenerator {
  constructor(private readonly secret: string) {}
  async generateToken({ expirationInMs, key }: Params): Promise<Result> {
    return sign({ key }, this.secret, { expiresIn: expirationInMs / 1000 })
  }
}
