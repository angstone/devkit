import { SUPPORTED_COUNTRY_PHONE_CODES_ARRAY, validate } from '../../..'

const countryDialCodeList = SUPPORTED_COUNTRY_PHONE_CODES_ARRAY()

/**
 * The phone dial code of the country
 *
 * @TJS-type string
 */
export type ICountryDialCode = typeof countryDialCodeList[number]

export const isICountryDialCode = (d: any): d is ICountryDialCode =>
  validate('countryDialCode', { countryDialCode: d }, 'required', [
    ...countryDialCodeList,
  ])

/**
 * the phone number.
 *
 * @minimum 8
 * @maximum 15
 * @format only-numbers
 * @TJS-type string
 */
export type IPhoneNumber = string

const LIMITS: any = {
  phoneNumber: {
    max: 15,
    min: 8,
  },
}

export const isIPhoneNumber = (d: any): d is IPhoneNumber =>
  validate(
    'phoneNumber',
    { phoneNumber: d },
    'required',
    'string',
    LIMITS,
    (dt: any) => {
      const t = /^\d+$/.test(dt)
      if (!t) {
        throw new Error('property phoneNumber must only numbers in the string')
      }
      return true
    }
  )

export interface IPhone {
  /**
   * The phone dial code of the country
   *
   * @TJS-type string
   */
  countryDialCode: ICountryDialCode
  phoneNumber: IPhoneNumber
}

export const isIPhone = (t: any): t is IPhone =>
  validate(
    'countryDialCode',
    t,
    'required',
    'string',
    {},
    isICountryDialCode
  ) && validate('phoneNumber', t, 'required', 'string', {}, isIPhoneNumber)
