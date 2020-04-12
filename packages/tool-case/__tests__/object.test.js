import tobject from '../src/object';

describe('ObjectTools', () => {
  describe('filter', () => {
    let testObj = {
      foo1: 10,
      foo: 20,
      bar: 100,
      bar2: 200,
      poo: 30,
    };

    test('default value', () => {
      expect(tobject.filter()).toEqual({});
    });

    test('simple predicate', () => {
      const result = tobject.filter(testObj, (key, obj) => {
        if (obj[key] > 20) {
          return true;
        }
        return false;
      });
  
      expect(result).toEqual({
        bar: 100,
        bar2: 200,
        poo: 30,
      });
    });
    
    test('extract', () => {
      const testKeyArr = ['foo', 'bar'];
  
      const result = tobject.filter(testObj, (key, obj) => {
        for (const target of testKeyArr) {
          if (key.indexOf(target) > -1) {
            return true;
          }
        }
        return false;
      });
  
      expect(result).toEqual({
        foo1: 10,
        foo: 20,
        bar: 100,
        bar2: 200,
      });
    });
  });

  describe('map', () => {
    let testObj = {
      foo1: 10,
      foo: 20,
      bar: 100,
      bar2: 200,
      poo: 30,
    };

    test('default value', () => {
      expect(tobject.filter()).toEqual({});
    });

    test('simple map1', () => {
      const result = tobject.map(testObj, (value, key, obj) => {
        return value + 7;
      });
  
      expect(result).toEqual({
        foo1: 17,
        foo: 27,
        bar: 107,
        bar2: 207,
        poo: 37,
      });
    });

    test('simple map2', () => {
      const result = tobject.map(testObj, (value, key, obj) => {
        return {
          [key]: value,
          newVal: value + 7
        };
      });
  
      expect(result).toEqual({
        foo1: {foo1: 10, newVal: 17},
        foo: {foo: 20, newVal: 27},
        bar: {bar: 100, newVal: 107},
        bar2: {bar2: 200, newVal: 207},
        poo: {poo: 30, newVal: 37},
      });
    });
  });
  
  describe('extract', () => {
    test('default value', () => {
      expect(tobject.extract()).toEqual({});
    });

    test('extract items', () => {
      const testObj = {
        marginTop: 10,
        margin: 20,
        paddingLeft: 30,
        padding: 50,
        foo: 200,
      };
      const testKeyArr = ['margin', 'padding'];
  
      expect(tobject.extract(testObj, testKeyArr)).toEqual({
        marginTop: 10,
        margin: 20,
        paddingLeft: 30,
        padding: 50,
      });
      expect(tobject.extract(testObj, testKeyArr, true)).toEqual({
        margin: 20,
        padding: 50,
      });
    });
  });

  describe('remove', () => {
    test('default value', () => {
      expect(tobject.remove()).toEqual({});
    });

    test('remove items', () => {
      const testObj = {
        marginTop: 10,
        margin: 20,
        paddingLeft: 30,
        padding: 50,
        foo: 200,
      };
      const testKeyArr = ['margin', 'padding'];
  
      expect(tobject.remove(testObj, testKeyArr)).toEqual({
        foo: 200,
      });
      expect(tobject.remove(testObj, testKeyArr, true)).toEqual({
        marginTop: 10,
        paddingLeft: 30,
        foo: 200,
      });
    });
  });

  test('isEmptyObject', () => {
    expect(tobject.isEmptyObject({})).toBe(true);
    expect(tobject.isEmptyObject({ a: 10 })).toBe(false);
  });
});