import { getTypeOf } from './get-type-of'

export function mergeObject (target, src) {
  const merged = Object.assign({}, target)

  Object.keys(src).forEach((prop) => {
    const srcVal = src[prop]
    const targetVal = merged[prop]
    if (getTypeOf(targetVal) === 'Object' &&
      getTypeOf(srcVal) === 'Object') {
      mergeObject(targetVal, srcVal)
    } else {
      merged[prop] = srcVal
    }
  })

  return merged
}
