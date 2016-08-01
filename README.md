# object-property-names

[![npm version](https://badge.fury.io/js/object-property-names.svg)](https://badge.fury.io/js/object-property-names) [![Build Status](https://travis-ci.org/dorayx/object-property-names.svg?branch=master)](https://travis-ci.org/dorayx/object-property-names) [![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![Dependency Status](https://david-dm.org/dorayx/object-property-names.svg)](https://david-dm.org/dorayx/object-property-names/)

Get any property names (enumerable or not) you need from a JavaScript object.

## Description

The properties will be found upon the object through its prototype chain to the top. During the prototype chain lookup, two rules - the type rule and the property rule, can apply to ignore the specified types and properties.

## Features

- Tiny and No dependence
- Flexible control
- Support ES2015 Module and UMD (support [`jsnext:main`](https://github.com/jsforum/jsforum/issues/5))

## Type Rule & Property Rule

The **Type Rule** is the list of the types to be ignored and the properties of those ignored types won't be returned. Please note that the type rule applies not only to the prototype but also to the given object.

The types can be native or custom, such as `String`, `Function`, `Array` and your `SomeClass`. During the prototype chain lookup, any of the types is found ignored then its upper prototype chain won't be sought. By default all the native types will be ignored.

The **Property Rule** is the list of the properties to be ignored.

Those properties may be private, context-irrelative or non-enumerable. By default the property name prefixed with `_` will be regarded private and so ignored. The `constructor` property is also ignored.

## API

### `getPropertyNamesByRules(object[, rules])`

- the parameter `object` whose enumerable and non-enumerable property names to be returned
- the optional parameter `rules` to create the type/property rule

```
rules = {
  ignoredTypes: array(string|regexp) | string | regexp | function,
  ignoredProperties: array(string|regexp) | string | regexp | function
}
```

The `rules` can also be any value that coerces to a Boolean except for an Object. If the `rules` is evaluated truthy, the default rules will both apply, otherwise every property defined on the given object through the prototype chain will be all returned.

```
> // null is translated to a false
> // all the properties defined on the object are returned
> getPropertyNamesByRules([], null)
> ['length','constructor','toString','toLocaleString','join','pop','push','reverse','shift','unshift','slice','splice','sort','filter','forEach','some','every','map','indexOf','lastIndexOf','reduce','reduceRight','copyWithin','find','findIndex','fill','includes','entries','keys','concat']
```

You can simply override any of the rules, either the type rule or the property rule, and another one will be set to the corresponding default rule.

If a *callback function* applies to any of the rules, the *callback* should return a Boolean (or any value that can be translated to a Boolean) and it will be called upon the given object (*`this` will refer to the given object*) with two arguments: the property name and the given object.

```
getPropertyNamesByRules(t4, {
  ignoredTypes: (type) => type === 'T1'
})
```

The code below creates a rule to ignore the non-enumerable properties:

```
getPropertyNamesByRules(t4, {
  ignoredPropreties: (prop, object) => !object.propertyIsEnumerable(prop)
})
```

If an array is provided, only when any of the array elements (strings, regexps ...) can be evaluated truthy will the rule apply.

```
getPropertyNamesByRules(t4, {
  ignoredTypes: [/^_+/, 'T1']
})
```

### `getAllPropertyNames(object)`

This function returns all the property names defined on the given object through the whole prototype chain because no rules apply.

```
> getAllPropertyNames([])
> ['length','constructor','toString','toLocaleString','join','pop','push','reverse','shift','unshift','slice','splice','sort','filter','forEach','some','every','map','indexOf','lastIndexOf','reduce','reduceRight','copyWithin','find','findIndex','fill','includes','entries','keys','concat']
```

### `getNonNativePropertyNames(object)`

This function returns the non-native property names (not defined by JavaScript).

```
> // Array is the native type in JavaScript
> // and so there're no non-native properties found
> getNonNativePropertyNames([])
> []
> 
> const object = {a: 1}
> getNonNativePropertyNames(object)
> ['a']
```

## Usage

### ES2015 Module

*path: object-property-names/build/index.es.js*

```
import {
	getPropertyNamesByRules,
	getAllPropertyNames,
	getNonNativePropertyNames
} from 'object-property-names'
```

### **UMD**

*path: object-property-names/build/index.umd.js*

#### UMD: CommonJS

```
var ObjectPropertyNames = require('object-property-names')
var getPropertyNamesByRules = ObjectPropertyNames. getPropertyNamesByRules
var getAllPropertyNames = ObjectPropertyNames. getAllPropertyNames
var getNonNativePropertyNames = ObjectPropertyNames. getNonNativePropertyNames
```

#### UMD: AMD

```
require(['ObjectPropertyNames'], function(ObjectPropertyNames) {
  var getPropertyNamesByRules = ObjectPropertyNames. getPropertyNamesByRules
  var getAllPropertyNames = ObjectPropertyNames. getAllPropertyNames
  var getNonNativePropertyNames = ObjectPropertyNames. getNonNativePropertyNames
})
```

#### UMD: IIFE

```
var getPropertyNamesByRules = window.ObjectPropertyNames. getPropertyNamesByRules
var getAllPropertyNames = window.ObjectPropertyNames. getAllPropertyNames
var getNonNativePropertyNames = window.ObjectPropertyNames. getNonNativePropertyNames
```


## License

[MIT](https://opensource.org/licenses/MIT). © 2016 Doray Hong

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)