import { getTypeOf } from '../lib/get-type-of'
import { mergeObject } from '../lib/merge-object'

const ignoredProperties = [
  /^_+/,
  'constructor'
]

const ignoredTypes = [
  'Array',
  'Boolean',
  'Date',
  'Function',
  'Map',
  'Number',
  'Object',
  'RegExp',
  'String',
  'WeakMap',
  'WeakSet'
]

function includes (array, target) {
  return array && array.indexOf(target) !== -1
}

function applyRules (rules, value, context) {
  const type = getTypeOf(rules)

  switch (type) {
    case 'Array':
      return rules.some((rule) => applyRules(rule, value, context))
    case 'String':
      return rules === value
    case 'Function':
      return rules.call(context, value, context)
    case 'RegExp':
      return rules.test(value)
    default:
      return false
  }
}

function shouldIgnore (property, rules, context) {
  if (!rules) return false
  return applyRules(rules, property, context)
}

function getPropertyNames (object, rules, context) {
  const prototype = Object.getPrototypeOf(object)

  if (!prototype || shouldIgnore(getTypeOf(object), rules.ignoredTypes, context)) {
    return []
  }

  const ownProperties = Object.getOwnPropertyNames(object)
  const protoProperties = getPropertyNames(prototype, rules, context)

  return [...ownProperties, ...protoProperties].reduce((unique, name) => {
    const skip = includes(unique, name) || shouldIgnore(name, rules.ignoredProperties, context)
    return unique.concat(skip ? [] : name)
  }, [])
}

export const DEFAULT_IGNORED_PROPERTIES = ignoredProperties
export const DEFAULT_IGNORED_TYPES = ignoredTypes

export function getPropertyNamesByRules (object, ignoringRules) {
  const rules = ignoringRules ? mergeObject({ignoredTypes, ignoredProperties}, ignoringRules) : false
  return getPropertyNames(object, rules, object)
}

export function getAllPropertyNames (object) {
  return getPropertyNamesByRules(object, /* no rules */ false)
}

export function getNonNativePropertyNames (object) {
  return getPropertyNamesByRules(object, /* default rules */ true)
}
