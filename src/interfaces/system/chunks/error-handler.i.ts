import { validate } from '../../../tools'

export interface IErrorHandler {
  is: (message?: string, ...details: any[]) => Error
  op: (message?: string | Error, ...details: any[]) => Error
  fatal: (message?: string | Error, ...details: any[]) => Error
  throw: (message?: string | Error, ...details: any[]) => void
}

export const isIErrorHandler = (d: any): d is IErrorHandler =>
  validate('is', d, 'required', 'function') &&
  validate('op', d, 'required', 'function') &&
  validate('fatal', d, 'required', 'function') &&
  validate('throw', d, 'required', 'function')
