import tdate from '../src/date';

describe('DateTools', () => {
  test('isDate', () => {
    expect(tdate.isDate('foo')).toBe(false);
    expect(tdate.isDate(new Date(2020, undefined, 1))).toBe(false);
    expect(tdate.isDate(new Date(2020, 1, 1))).toBe(true);
  });
});