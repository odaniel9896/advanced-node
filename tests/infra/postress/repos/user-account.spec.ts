import { LoadUserAccountRepository } from '@/data/contracts/repos'
import { newDb } from 'pg-mem'
import { Column, Entity, getRepository, PrimaryGeneratedColumn } from 'typeorm'
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
    it('should return an account if email exists', async () => {
      const db = newDb()
      const connection = await db.adapters.createTypeormConnection({
        type: 'postgres',
        entities: [PGUser]
      })
      await connection.synchronize()
      console.log('salve')
      const pgUserRepository = getRepository(PGUser)
      await pgUserRepository.save({ email: 'existing_email' })
      const sut = new PGUserAccountRepository()

      const account = await sut.load({ email: 'existing_email' })
      console.log(account, 'sou account')
      expect(account).toEqual({ id: '1' })
    })
  })
})
