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
});