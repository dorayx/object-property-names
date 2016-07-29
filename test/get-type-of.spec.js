import { expect } from 'chai'
import { getTypeOf } from '../lib/get-type-of'

describe('getTypeOf', () => {
  it('should return the type name of the object', () => {
    class C1 {}
    class C2 extends C1 {}

    const cases = {
      'Boolean': true,
      'Number': 1,
      'String': 'string',

      'Array': [],
      'Function': () => {},
      'Object': {},

      'Date': new Date(),
      'Map': new Map(),
      'RegExp': /reg/,
      'Set': new Set(),
      'WeakMap': new WeakMap(),
      'WeakSet': new WeakSet(),

      'C1': new C1(),
      'C2': new C2(),

      'Null': null,
      'Undefined': undefined
    }

    Object.keys(cases).forEach((expected) => {
      expect(getTypeOf(cases[expected])).to.equal(expected)
    })
  })
})
