import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/data/contracts/repos'
import { getRepository } from 'typeorm'
import { PGUser } from '@/infra/postgres/entities'

export class PGUserAccountRepository implements LoadUserAccountRepository {
  async load(params: LoadUserAccountRepository.Params): Promise<LoadUserAccountRepository.Result> {
    const pgUserRepository = getRepository(PGUser)
    const pgUser = await pgUserRepository.findOne({ email: params.email })
    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }

  async saveWithFacebook(params: SaveFacebookAccountRepository.Params): Promise<void> {
    const pgUserRepository = getRepository(PGUser)
    if (params.id === undefined) {
      await pgUserRepository.save({
        email: params.email,
        name: params.name,
        facebookId: params.facebookId
      })
    } else {
      await pgUserRepository.update(
        {
          id: parseInt(params.id)
        },
        {
          name: params.name,
          facebookId: params.facebookId
        }
      )
    }
  }
}
