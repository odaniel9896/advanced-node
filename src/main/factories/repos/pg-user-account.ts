import { PGUserAccountRepository } from '@/infra/postgres/repos'

export const makePGUserAccountRepo = (): PGUserAccountRepository => {
  return new PGUserAccountRepository()
}
