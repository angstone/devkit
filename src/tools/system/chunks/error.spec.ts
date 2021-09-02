/* tslint:disable:no-unused-expression */
/* tslint:disable:no-implicit-dependencies */
import { expect } from 'chai'
import { spy } from 'sinon'

import { IErrorHandler } from '../../../'
import { defaultError } from './default-error'
import { Err, state } from './error'

describe('error', () => {
  const objectTest = new Error('Amazing Nice Error')

  /* tslint:disable:no-empty */
  const mockError: IErrorHandler = {
    fatal: (message?: string | Error, ...details: any[]): Error => new Error(),
    is: (message?: string, ...details: any[]): Error => new Error(),
    op: (message?: string | Error, ...details: any[]): Error => new Error(),
    throw: (message?: string | Error, ...details: any[]): void => {},
  }

  after(() => {
    Err.useError(defaultError)
  })

  it('should have the fatal, op, is and throw functions', () => {
    expect(Err.fatal).to.be.exist
    expect(Err.op).to.be.exist
    expect(Err.is).to.be.exist
    expect(Err.throw).to.be.exist
  })

  it('should use mock error', () => {
    Err.useError(mockError)
    expect(state.error).to.be.equals(mockError)
  })

  it('should do fatal, error, note and dev', () => {
    Err.useError(mockError)
    const errorIsSpy = spy(mockError, 'is')
    const errorOpSpy = spy(mockError, 'op')
    const errorFatalSpy = spy(mockError, 'fatal')
    const errorThrowSpy = spy(mockError, 'throw')
    Err.is(JSON.stringify(objectTest))
    Err.op(objectTest)
    Err.fatal(objectTest)
    Err.throw(objectTest)
    errorIsSpy.should.have.been.calledWith(JSON.stringify(objectTest))
    errorOpSpy.should.have.been.calledWith(objectTest)
    errorFatalSpy.should.have.been.calledWith(objectTest)
    errorThrowSpy.should.have.been.calledWith(objectTest)
    errorIsSpy.restore()
    errorOpSpy.restore()
    errorFatalSpy.restore()
    errorThrowSpy.restore()
  })
})
