# object-property-names

Get the property names (enumerable or not) through the prototype chain of the given object.

## Description

The properties will be found upon the object through its prototype chain to the top. During the prototype chain lookup, two rules, the type rule and the property rule, can be applied to ignore the specific types and properties.

## Type Rule & Property Rule

The **Type Rule** is a list of the types to be ignored and the properties of those ignored types won't be returned. Please note that the type rule only applies to the prototype but not to the given object.

The types can be native or user-defined, such as `String`, `Function`, `Array` and your `SomeClass`. During the prototype chain lookup, any one of the types is found ignored then its upper prototype chain won't be sought. By default all the native types will be ignored.

The **Property Rule** is the list of the properties to be ignored.

Those properties may be private, context-irrelative or non-enumerable. By default the property name prefixed with `_` will be regarded private and so ignored. The `contructor` property is also ignored.

## API & Usage

### `getPropertyNamesByRules(object[, rules])`

- the parameter `object` whose enumerable and non-enumerable property names to be returned
- the optional parameter `rules` to create the type/property rule

```
rules = {
  ignoredTypes: array(string|regexp) | string | regexp | function,
  ignoredProperties: array(string|regexp) | string | regexp | function
}
```

The `rules` can also be any value that coerces to true or false. If the `rules` is evaluated truthy, the default rules of types and properties will apply, otherwise every property defined on the object through the prototype chain will be all returned.

```
> // null is translated to a false
> getPropertyNamesByRules([], null)
> ['length','constructor','toString','toLocaleString','join','pop','push','reverse','shift','unshift','slice','splice','sort','filter','forEach','some','every','map','indexOf','lastIndexOf','reduce','reduceRight','copyWithin','find','findIndex','fill','includes','entries','keys','concat']
```

You can only override one of the rules: the type rule or the property rule, and the other one will be the corresponding default rule.

If a *callback function* applies to any of the rules, the *callback* should return a Boolean (or any value that can be translated to a Boolean) and it is called upon the given object (*`this` will refer to the given object*) with two arguments: the property name and the given object.

```
getPropertyNamesByRules(t4, {
  ignoredTypes: (type) => type === 'T1'
})
```

The code below create a rule to ignore the non-enumerable properties:

```
getPropertyNamesByRules(t4, {
  ignoredPropreties: (prop, object) => !object.propertyIsEnumerable(prop)
})
```

If an array applies to any of the rules and any one of the array elements (strings, regexp ...) can be evaluated truthy then the rule will be applied.

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

This function returns the non-native property names.

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

## License

[MIT](https://opensource.org/licenses/MIT). © 2016 Doray Hong

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)