import { mock, MockProxy } from 'jest-mock-extended'

interface Validator {
  validate: () => Error | undefined
}

class ValidationComposite implements Validator {
  constructor(private readonly validators: Validator[]) {}

  validate(): Error | undefined {
    for (const validator of this.validators) {
      const error = validator.validate()
      if (error !== undefined) {
        return error
      }
    }
    return undefined
  }
}

describe('ValidationComposite', () => {
  let sut: ValidationComposite
  let validator1: MockProxy<Validator>
  let validator2: MockProxy<Validator>
  let validators: Validator[]

  beforeAll(() => {
    validator1 = mock<Validator>()
    validator1.validate.mockReturnValue(undefined)
    validator2 = mock<Validator>()
    validator2.validate.mockReturnValue(undefined)
    validators = [validator1, validator2]
  })

  beforeEach(() => {
    sut = new ValidationComposite(validators)
  })

  it('should return undefined if all validators returns undefined', () => {
    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  it('should return the first error', () => {
    validator1.validate.mockReturnValueOnce(new Error('error_1'))
    validator2.validate.mockReturnValueOnce(new Error('error_2'))
    const error = sut.validate()

    expect(error).toEqual(new Error('error_1'))
  })

  it('should return the error', () => {
    validator1.validate.mockReturnValue(new Error('error_1'))
    validator2.validate.mockReturnValue(new Error('error_2'))
    const error = sut.validate()

    expect(error).toEqual(new Error('error_1'))
  })
})