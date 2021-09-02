/* tslint:disable:no-unused-expression */
/* tslint:disable:no-implicit-dependencies */
import { expect } from 'chai'
import { spy } from 'sinon'

import { ILoggerHandler } from '../../../'
import { defaultLogger } from './default-logger'
import { Log, state as LogState } from './log'

describe('Log', () => {
  const objectTest = {
    data: {
      complex: 'stuf',
      with: ['an', 'array'],
    },
    name: 'object test',
  }

  /* tslint:disable:no-empty */
  const mockLogger: ILoggerHandler = {
    dash: () => {},
    dev: (...args) => {},
    error: (...args) => {},
    fatal: (...args) => {},
    note: (...args) => {},
  }

  after(()=>{
    Log.useLogger(defaultLogger)
  })

  it('should have the fatal, error, note and dev functions', () => {
    expect(Log.fatal).to.be.exist
    expect(Log.error).to.be.exist
    expect(Log.note).to.be.exist
    expect(Log.dev).to.be.exist
    expect(Log.dash).to.be.exist
    expect(Log.useLogger).to.be.exist
  })

  it('should use mock Log', () => {
    Log.useLogger(mockLogger)
    expect(LogState.logger).to.be.equals(mockLogger)
  })

  it('should do fatal, error, note and dev', () => {
    Log.useLogger(mockLogger)
    const LogDashSpy = spy(mockLogger, 'dash')
    const LogDevSpy = spy(mockLogger, 'dev')
    const LogNoteSpy = spy(mockLogger, 'note')
    const LogErrorSpy = spy(mockLogger, 'error')
    const LogFatalSpy = spy(mockLogger, 'fatal')
    Log.dash()
    Log.fatal(objectTest)
    Log.error(objectTest)
    Log.note(objectTest)
    Log.dev(objectTest)
    LogDashSpy.should.have.been.called
    LogDevSpy.should.have.been.calledWith(objectTest)
    LogNoteSpy.should.have.been.calledWith(objectTest)
    LogErrorSpy.should.have.been.calledWith(objectTest)
    LogFatalSpy.should.have.been.calledWith(objectTest)
    LogDashSpy.restore()
    LogDevSpy.restore()
    LogNoteSpy.restore()
    LogErrorSpy.restore()
    LogFatalSpy.restore()
  })
})
