import { PGUser } from '@/infra/postgres/entities'
import { PGUserAccountRepository } from '@/infra/postgres/repos'
import { IBackup } from 'pg-mem'
import { getConnection, getRepository, Repository } from 'typeorm'
import { makeFakeDb } from '@/tests/infra/postress/mocks'

describe('PgUserAccountRepository', () => {
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

  describe('load', () => {
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

  describe('save with facebook', () => {
    it('should create an account if id is undefined', async () => {
      const { id } = await sut.saveWithFacebook({
        email: 'any_email',
        name: 'any_name',
        facebookId: 'any_fb_id'
      })

      const pgUser = await pgUserRepo.findOne({ email: 'any_email' })

      expect(pgUser?.id).toBe(1)
      expect(id).toBe('1')
    })

    it('should update account if id is  defined', async () => {
      await pgUserRepo.save({ email: 'any_email', name: 'any_name', facebookId: 'any_fb_id' })

      const { id } = await sut.saveWithFacebook({
        id: '1',
        email: 'new_email',
        name: 'new_name',
        facebookId: 'new_fb_id'
      })

      const pgUser = await pgUserRepo.findOne({ id: 1 })

      expect(pgUser).toEqual({
        id: 1,
        email: 'any_email',
        name: 'new_name',
        facebookId: 'new_fb_id'
      })
      expect(id).toBe('1')
    })
  })
})
