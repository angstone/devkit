import { validate } from '../../..'

/**
 * ISO timestamp.
 *
 * @minimum 1
 * @maximum 100
 * @format date-time
 * @TJS-type string
 */
export type IIsoTimestamp = string

export const isIIsoTimestamp = (d: any): d is IIsoTimestamp =>
  validate(
    'timestamp',
    { timestamp: d },
    'required',
    'string',
    null,
    (dt: any) => {
      if (/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+/.test(dt)) {
        return true
      }
      if (/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\dZ/.test(dt)) {
        return true
      }
      throw new Error('data do not match ISOTimestamp format')
    }
  )
