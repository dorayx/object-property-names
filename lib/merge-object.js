import { getTypeOf } from './get-type-of'

export function mergeObject (target, src) {
  for (let prop in src) {
    if (src.hasOwnProperty(prop)) {
      const srcVal = src[prop]
      const targetVal = target[prop]
      const shouldMerge = getTypeOf(targetVal) === 'Object' && getTypeOf(srcVal) === 'Object'
      target[prop] = shouldMerge ? mergeObject(targetVal, srcVal) : srcVal
    }
  }
  return target
}
