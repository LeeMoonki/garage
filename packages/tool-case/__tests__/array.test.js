import tarray from '../src/array';

describe('ArrayTools', () => {
  test('isEmpty', () => {
    expect(tarray.isEmpty([])).toBe(true);
    expect(tarray.isEmpty([1])).toBe(false);
  });
  test('isUseful', () => {
    expect(tarray.isUseful([])).toBe(false); 
    expect(tarray.isUseful([1])).toBe(true); 
  });
  describe('mapLarge', () => {
    test('basic functioning', async () => {
      const larr = [];
      let result;
      const length = 10;
      const chunkSize = 2;
      const spy = jest.spyOn(window, 'setTimeout');

      for (let i = 0; i < length; i++) {
        larr.push(i);
      }
      await tarray.mapLarge(larr, v => v * 2, chunkSize).then(res => result = res);

      expect(tarray.mapLarge()).toBe(null);
      expect(spy).toHaveBeenCalledTimes((length / chunkSize) - 1);
      expect(result.length).toBe(10);
      expect(result[larr.length - 1]).toBe(larr[larr.length - 1] * 2);
    });

    test('map object in array', async () => {
      const larr = [];
      let result;
      const length = 10;
      const chunkSize = 2;

      for (let i = 0; i < length; i++) {
        larr.push({ index: i, value: 10 * i });
      }
      await tarray.mapLarge(
        larr,
        v => ({index: v.index, value: v.value + 5}), chunkSize)
        .then(res => result = res);

      expect(result.length).toBe(10);
      expect(result[result.length - 1].value).toBe(larr[larr.length - 1].value + 5);
    });
  });
});