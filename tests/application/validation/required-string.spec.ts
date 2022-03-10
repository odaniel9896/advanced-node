import { RequiredFieldError } from '@/apllication/errors'
import { RequiredStringValidator } from '@/apllication/validation/required-string'

describe('RequiredStringValidator', () => {
  it('should return RequiredFieldError if value is empty', () => {
    const sut = new RequiredStringValidator('', 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return RequiredFieldError if value is null', () => {
    const sut = new RequiredStringValidator(null as any, 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return RequiredFieldError if value is undefined', () => {
    const sut = new RequiredStringValidator(null as any, 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return undefined if value it not empty', () => {
    const sut = new RequiredStringValidator('any_value', 'any_field')

    const error = sut.validate()

    expect(error).toBe(undefined)
  })
})
