import { LoadUserAccountRepository } from '@/data/contracts/repos'
import { IBackup, newDb } from 'pg-mem'
import { Column, Entity, getConnection, getRepository, PrimaryGeneratedColumn, Repository } from 'typeorm'
class PGUserAccountRepository implements LoadUserAccountRepository {
  async load(params: LoadUserAccountRepository.Params): Promise<LoadUserAccountRepository.Result> {
    const pgUserRepository = getRepository(PGUser)
    const pgUser = await pgUserRepository.findOne({ email: params.email })
    console.log(pgUser, 'ola sou o pguser')
    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }
}

@Entity({ name: 'usuarios' })
class PGUser {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: true, name: 'nome' })
  name?: string

  @Column()
  email!: string

  @Column({ nullable: true, name: 'id_facebook' })
  facebookId?: string
}

describe('PgUserAccountRepository', () => {
  describe('load', () => {
    let sut: PGUserAccountRepository
    let pgUserRepo: Repository<PGUser>
    let backup: IBackup

    beforeAll(async () => {
      const db = newDb()
      const connection = await db.adapters.createTypeormConnection({
        type: 'postgres',
        entities: [PGUser]
      })
      await connection.synchronize()
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
