import { validate } from '../../..'

const httpPlaceList = [
  'query',
  'path',
  'body',
  'header',
  'xform', // form, formData
  'redirectUrl',
] as const

/**
 * the http request place
 *
 * @TJS-type string
 * enum ["query", "path", "body", "header"]
 */
export type IHttpPlace = typeof httpPlaceList[number]

export const isIHttpPlace = (t: any): t is IHttpPlace =>
  validate('httpPlace', { httpPlace: t }, 'required', [...httpPlaceList])
