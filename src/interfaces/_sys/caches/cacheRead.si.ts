import {
  COMMON_VALIDATIONS,
  isSICachePlace,
  SICachePlace,
  validate,
} from '../../../'

export interface SICacheRead<T> {
  data: T
  origin?: SICachePlace
  updatedAt: number
}

export const isSICacheRead = <T>(t: any): t is SICacheRead<T> =>
  validate('origin', t, 'optional', 'string', null, isSICachePlace) &&
  validate(
    'updatedAt',
    t,
    'required',
    'number',
    {
      updatedAt: {
        max: Infinity,
        min: 0,
      },
    },
    COMMON_VALIDATIONS.INTEGER
  )
