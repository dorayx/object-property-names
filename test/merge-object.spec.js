import { expect } from 'chai'
import { mergeObject } from '../lib/merge-object'

describe('mergeObject', () => {
  const defaultVal = {
    a: {
      b: 1
    },
    c: {
      d: {
        e: 2
      }
    }
  }

  const newValue = {
    a: {
      b: 2
    },
    c: {
      f: {
        g: 3
      }
    }
  }

  const expected = {
    a: {
      b: 2
    },
    c: {
      d: {
        e: 2
      },
      f: {
        g: 3
      }
    }
  }

  it('should merge the defaultValue with the newValue', () => {
    const result = mergeObject(defaultVal, newValue)

    expect(result).to.eql(expected)
  })
})
