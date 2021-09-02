import { ALL_COUNTRIES_NAMES_ARRAY, validate } from '../../..'

const countryNameList = ALL_COUNTRIES_NAMES_ARRAY()

/**
 * @TJS-type string
 */
export type ICountryName = typeof countryNameList[number]

export const isICountryName = (d: any): d is ICountryName =>
  validate('country', { country: d }, 'required', [...countryNameList])
