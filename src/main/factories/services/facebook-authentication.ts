import { FacebookAuthenticationService } from '@/data/contracts/services'
import { makeFacebookApi } from '@/main/factories/apis'
import { makePGUserAccountRepo } from '@/main/factories/repos'
import { makeJwtTokenGenerator } from '@/main/factories/crypto'

export const makeFacebookAuthenticationService = (): FacebookAuthenticationService => {
  return new FacebookAuthenticationService(makeFacebookApi(), makePGUserAccountRepo(), makeJwtTokenGenerator())
}
