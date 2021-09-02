import { env, ENVS } from '../../../'

type FuncToEval = (...args: any[]) => void

export const evalDev = (funcToEval: FuncToEval, ...args: any[]) => {
  if (env.APP_ENV === ENVS.DEV) {
    funcToEval(...args)
  }
}
