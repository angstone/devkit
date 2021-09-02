import { validate } from '../../..'

const httpVerbList = ['GET', 'PUT', 'POST', 'DELETE'] as const

/**
 * the http request verb
 *
 * @TJS-type string
 * enum ["GET", "PUT", "POST", "DELETE"]
 */
export type IHttpVerb = typeof httpVerbList[number]

export const isIHttpVerb = (t: any): t is IHttpVerb =>
  validate('httpVerb', { httpVerb: t }, 'required', [...httpVerbList])
