import { IErrorHandler, isIErrorHandler } from '../../../'
import { defaultError } from './default-error'

interface IErrorWrapper extends IErrorHandler {
  useError: (error: IErrorHandler) => void
  getErrorHandler: () => IErrorHandler
}

interface IErrorState {
  error: IErrorHandler
}

export const state: IErrorState = {
  error: defaultError,
}

/* tslint:disable:no-shadowed-variable */
const useError = (error: IErrorHandler) => {
  if(isIErrorHandler(error)) {
    state.error = error
  }
}

const getErrorHandler = (): IErrorHandler => {
  return state.error
}

const is = (message?: string, ...details: any[]): Error => {
  return state.error.is(message, ...details)
}
const op = (message?: string | Error, ...details: any[]): Error => {
  return state.error.op(message, ...details)
}
const fatal = (message?: string | Error, ...details: any[]): Error => {
  return state.error.fatal(message, ...details)
}

export const Err: IErrorWrapper = {
  fatal,
  getErrorHandler,
  is,
  op,
  throw: (message?: string | Error, ...details: any[]) => {
    state.error.throw(message, ...details)
  },
  useError,
}
