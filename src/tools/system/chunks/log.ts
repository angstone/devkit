import { ILoggerHandler, isILoggerHandler } from '../../../interfaces'
import { defaultLogger } from './default-logger'

interface ILogState {
  logger: ILoggerHandler
}

interface ILoggerHandlerWrapper extends ILoggerHandler {
  useLogger: (logger: ILoggerHandler) => void
}

export const state: ILogState = {
  logger: defaultLogger,
}

/* tslint:disable:no-shadowed-variable */
const useLogger = (logger: ILoggerHandler) => {
  if (isILoggerHandler(logger)) {
    state.logger = logger
  }
}

const fatal = (...args: any[]) => {
  state.logger.fatal(...args)
}
const error = (...args: any[]) => {
  state.logger.error(...args)
}
const note = (...args: any[]) => {
  state.logger.note(...args)
}
const dev = (...args: any[]) => {
  state.logger.dev(...args)
}

const dash = () => {
  state.logger.dash()
}

export const Log: ILoggerHandlerWrapper = {
  dash,
  dev,
  error,
  fatal,
  note,
  useLogger,
}
