import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import chai from 'chai'
const { expect } = chai
import { getPropertyNamesByRules, getAllPropertyNames, getNonNativePropertyNames } from '../src/object-property-names'

chai.use(sinonChai)

describe('Get the property names of an object', () => {
  class T0 {}

  class T1 {
    constructor () {
      this.a = 'a'
    }

    b () {}
  }

  class T2 extends T1 {
    constructor () {
      super()
      this.c = 'c'
    }

    d () {}
  }

  class T3 {
    constructor () {
      this.privateProp = 'private'
      this.publicProp = 'public'
    }

    privateMethod () {}
    publicMethod () {}
  }

  class T4 extends T1 {}

  let t0
  let t1
  let t2
  let t3
  let t4

  const t1LeastExpected = ['a', 'b']
  const t2LeastExpected = ['a', 'b', 'c', 'd']
  const t3Expected = ['publicProp', 'publicMethod']
  const t3NotExpected = ['privateProp', 'privateMethod']
  const t4Expected = ['a']

  beforeEach(() => {
    t0 = new T0()
    t1 = new T1()
    t2 = new T2()
    t3 = new T3()
    t4 = new T4()
  })

  it('should retrieve all the property names of the object', () => {
    const t1Result = getAllPropertyNames(t1)
    const t2Result = getAllPropertyNames(t2)

    t1LeastExpected.forEach((e) => expect(t1Result).to.include(e))
    t2LeastExpected.forEach((e) => expect(t2Result).to.include(e))
  })

  it('should retrieve all the property names except for the ones from JavaScript native objects', () => {
    const t1Result = getNonNativePropertyNames(t1)
    const t2Result = getNonNativePropertyNames(t2)

    t1Result.forEach((e) => expect(t1LeastExpected).to.include(e))
    t2Result.forEach((e) => expect(t2LeastExpected).to.include(e))
  })

  it('should ignore a property starting with `private` by a set of rules', () => {
    const resultFunction = getPropertyNamesByRules(t3, {
      ignoredProperties: (prop) => prop.startsWith('private')
    })
    const resultRegExp = getPropertyNamesByRules(t3, {
      ignoredProperties: /^private/
    })
    const resultArray = getPropertyNamesByRules(t3, {
      ignoredProperties: t3NotExpected
    })
    const results = [resultFunction, resultRegExp, resultArray]

    results.forEach((result) => {
      t3Expected.forEach((e) => expect(result).to.include(e))
      t3NotExpected.forEach((e) => expect(result).not.to.include(e))
    })
  })

  it('should ignore the given type by a set of rules', () => {
    const resultString = getPropertyNamesByRules(t4, {
      ignoredTypes: 'T1'
    })
    const resultArray = getPropertyNamesByRules(t4, {
      ignoredTypes: ['T1']
    })
    const resultFunction = getPropertyNamesByRules(t4, {
      ignoredTypes: (type) => type === 'T1'
    })
    const resultRegExp = getPropertyNamesByRules(t4, {
      ignoredTypes: /T1/
    })
    const results = [resultString, resultArray, resultFunction, resultRegExp]

    results.forEach((result) => expect(result).to.eql(t4Expected))
  })

  it('should invoke the callback function for the rules', () => {
    const ignoredPropertiesCallback = sinon.spy()
    const ignoredTypesCallback = sinon.spy()

    getPropertyNamesByRules(t0, {
      ignoredProperties: ignoredPropertiesCallback,
      ignoredTypes: ignoredTypesCallback
    })

    expect(ignoredPropertiesCallback).to.have.been.calledOn(t0)
    expect(ignoredPropertiesCallback).to.have.been.calledWith(sinon.match.string, t0)
    expect(ignoredTypesCallback).to.have.been.calledOn(t0)
    expect(ignoredTypesCallback).to.have.been.calledWith(sinon.match.string, t0)
  })
})
