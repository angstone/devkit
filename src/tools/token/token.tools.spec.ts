/* tslint:disable:no-unused-expression */
/* tslint:disable:no-implicit-dependencies */
import { expect } from 'chai'

import { tokenTools } from './token.tools'

describe('tokenTooks', () => {
  it('should createToken', () => {
    const token = tokenTools.createToken()
    expect(token).to.be.string
    expect(token.length).to.be.equals(22)
  })
})
