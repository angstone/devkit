import { IHttpVerb, isIHttpVerb, isIUrl, IUrl, validate } from '../../..'

export interface IHttpCall {
  baseUrl: IUrl
  method: IHttpVerb
  queryParams?: any
  bodyParams?: any
  pathParams?: any
  headers?: any
  formData?: any
}

export const isIHttpCall = (d: any): d is IHttpCall =>
  validate('baseUrl', d, 'required', 'string', null, isIUrl) &&
  validate('method', d, 'required', 'string', null, isIHttpVerb) &&
  validate('queryParams', d, 'optional', 'object') &&
  validate('bodyParams', d, 'optional', 'object') &&
  validate('pathParams', d, 'optional', 'object') &&
  validate('headers', d, 'optional', 'object') &&
  validate('formData', d, 'optional', 'object')
