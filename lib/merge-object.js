import { getTypeOf } from './get-type-of'

export function mergeObject (target, src) {
  const merged = Object.assign({}, target)

  for (let prop in src) {
    if (src.hasOwnProperty(prop)) {
      const srcVal = src[prop]
      const targetVal = merged[prop]
      const shouldMerge = getTypeOf(targetVal) === 'Object' && getTypeOf(srcVal) === 'Object'
      merged[prop] = shouldMerge ? mergeObject(targetVal, srcVal) : srcVal
    }
  }

  return merged
}
