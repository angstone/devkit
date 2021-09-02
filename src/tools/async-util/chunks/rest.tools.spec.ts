/* tslint:disable:no-unused-expression */
/* tslint:disable:no-implicit-dependencies */
import { expect } from 'chai'
import { spy } from 'sinon'

import { rest } from './rest.tools'

describe('rest', () => {
  it('should stop by at least 500 ms', async () => {
    const now = Date.now()
    await rest(500)
    const then = Date.now()
    const diff = then - now
    expect(diff).to.be.at.least(500)
  })

  it('should stop by at least 250 ms and no more then 280 ms', async () => {
    const now = Date.now()
    let stopBefore: boolean = false
    setTimeout(() => {
      stopBefore = true
    }, 250)
    await rest(
      async (): Promise<boolean> => {
        return stopBefore
      }
    )
    const then = Date.now()
    const diff = then - now
    expect(diff).to.be.at.least(250)
    expect(diff).to.be.at.most(280)
  })

  it('should stop by at least 250 ms and no more then 280 ms also, function condition should be called more then 20 times', async () => {
    const now = Date.now()
    let stopBefore: boolean = false
    let conditionCalledTimes: number = 0
    setTimeout(() => {
      stopBefore = true
    }, 250)
    await rest(
      async (): Promise<boolean> => {
        conditionCalledTimes += 1
        return stopBefore
      }
    )
    const then = Date.now()
    const diff = then - now
    expect(conditionCalledTimes).to.be.at.least(20)
    expect(diff).to.be.at.least(250)
    expect(diff).to.be.at.most(280)
  })

  it('should stop by at least 250 ms and no more then 280 ms also, function condition should be called NO more then 10 times', async () => {
    const now = Date.now()
    let stopBefore: boolean = false
    let conditionCalledTimes: number = 0
    setTimeout(() => {
      stopBefore = true
    }, 250)
    await rest(async (): Promise<boolean> => {
      conditionCalledTimes += 1
      return stopBefore
    }, 25)
    const then = Date.now()
    const diff = then - now
    expect(conditionCalledTimes).to.be.at.most(10)
    expect(diff).to.be.at.least(250)
    expect(diff).to.be.at.most(280)
  })

  it('should stop by at least 250 ms and no more then 280 ms also, function condition should be called NO more then 10 times with reversed order', async () => {
    const now = Date.now()
    let stopBefore: boolean = false
    let conditionCalledTimes: number = 0
    setTimeout(() => {
      stopBefore = true
    }, 250)
    await rest(
      25,
      async (): Promise<boolean> => {
        conditionCalledTimes += 1
        return stopBefore
      }
    )
    const then = Date.now()
    const diff = then - now
    expect(conditionCalledTimes).to.be.at.most(10)
    expect(diff).to.be.at.least(250)
    expect(diff).to.be.at.most(280)
  })
})
