/* tslint:disable:no-unused-expression */
/* tslint:disable:no-implicit-dependencies */
import { expect } from 'chai'
import { spy } from 'sinon'

import { loop } from './loop.tools'

describe('loop', () => {
  it('should call more then 20 times my function', async () => {
    const now = Date.now()
    let stopThen: boolean = false
    let conditionCalledTimes: number = 0
    setTimeout(() => {
      stopThen = true
    }, 250)
    await new Promise<void>(r => {
      loop(
        async (): Promise<void> => {
          conditionCalledTimes += 1
        },
        async (): Promise<boolean> => {
          if (stopThen) {
            const then = Date.now()
            const diff = then - now
            expect(diff).to.be.at.least(250)
            expect(diff).to.be.at.most(280)
            setTimeout(r, 100)
          }
          return stopThen
        }
      )
    })
    expect(conditionCalledTimes).to.be.at.least(20)
  })

  it('should call 10 times my function', async () => {
    const now = Date.now()
    let stopThen: boolean = false
    let conditionCalledTimes: number = 0
    setTimeout(() => {
      stopThen = true
    }, 250)
    await new Promise<void>(r => {
      loop(
        async (): Promise<void> => {
          conditionCalledTimes += 1
        },
        async (): Promise<boolean> => {
          if (stopThen) {
            const then = Date.now()
            const diff = then - now
            expect(diff).to.be.at.least(250)
            expect(diff).to.be.at.most(280)
            setTimeout(r, 100)
          }
          return stopThen
        },
        25
      )
    })
    expect(conditionCalledTimes).to.be.at.most(10)
  })

  it('should call 10 times my function when reversed', async () => {
    const now = Date.now()
    let stopThen: boolean = false
    let conditionCalledTimes: number = 0
    setTimeout(() => {
      stopThen = true
    }, 250)
    await new Promise<void>(r => {
      loop(
        async (): Promise<void> => {
          conditionCalledTimes += 1
        },
        25,
        async (): Promise<boolean> => {
          if (stopThen) {
            const then = Date.now()
            const diff = then - now
            expect(diff).to.be.at.least(250)
            expect(diff).to.be.at.most(280)
            setTimeout(r, 100)
          }
          return stopThen
        }
      )
    })
    expect(conditionCalledTimes).to.be.at.most(10)
  })
})
