import tobject from '../src/object';

describe('ObjectTools', () => {
  describe('map', () => {
    let testObj = {
      foo1: 10,
      foo: 20,
      bar: 100,
      bar2: 200,
      poo: 30,
    };

    test('default value', () => {
      expect(tobject.map()).toEqual({});
    });

    test('simple predicate', () => {
      const result = tobject.map(testObj, (key, obj) => {
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
  
      const result = tobject.map(testObj, (key, obj) => {
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
});