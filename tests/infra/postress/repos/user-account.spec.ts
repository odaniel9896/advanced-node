import { PGUser } from '@/infra/postgres/entities'
import { PGUserAccountRepository } from '@/infra/postgres/repos'
import { IBackup } from 'pg-mem'
import { getConnection, getRepository, Repository } from 'typeorm'
import { makeFakeDb } from '@/tests/infra/postress/mocks'

describe('PgUserAccountRepository', () => {
  describe('load', () => {
    let sut: PGUserAccountRepository
    let pgUserRepo: Repository<PGUser>
    let backup: IBackup

    beforeAll(async () => {
      const db = await makeFakeDb()
      backup = db.backup()
      pgUserRepo = getRepository(PGUser)
    })

    afterAll(async () => {
      await getConnection().close()
    })

    beforeEach(() => {
      backup.restore()
      sut = new PGUserAccountRepository()
    })

    it('should return an account if email exists', async () => {
      await pgUserRepo.save({ email: 'existing_email' })

      const account = await sut.load({ email: 'existing_email' })

      expect(account).toEqual({ id: '1' })
    })

    it('should return undefined id email not exists', async () => {
      const account = await sut.load({ email: 'new_email' })

      expect(account).toBe(undefined)
    })
  })
})
