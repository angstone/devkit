import { ALL_COUNTRIES_CODES_ALPHA_TWO_ARRAY, validate } from '../../..'

const countryTwoCodeList = ALL_COUNTRIES_CODES_ALPHA_TWO_ARRAY()

/**
 * iso-3166-1 alpha3 country code
 *
 * @TJS-type string
 */
export type ICountryTwoCode = typeof countryTwoCodeList[number]

export const isICountryTwoCode = (d: any): d is ICountryTwoCode =>
  validate('countryTwoCode', { countryTwoCode: d }, 'required', [
    ...countryTwoCodeList,
  ])
