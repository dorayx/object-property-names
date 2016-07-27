export function getTypeOf (object) {
  if (typeof object === 'undefined') return 'Undefined'
  if (object === null) return 'Null'
  return object.constructor.name
}
