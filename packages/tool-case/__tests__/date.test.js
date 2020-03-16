import tdate from '../src/date';

describe('DateTools', () => {
  test('isDate', () => {
    expect(tdate.isDate('foo')).toBe(false);
    expect(tdate.isDate(new Date(2020, undefined, 1))).toBe(false);
    expect(tdate.isDate(new Date(2020, 1, 1))).toBe(true);
  });

  test('getNumOfWeeksOfMonth', () => {
    expect(tdate.getNumOfWeeksOfMonth(2020, 1)).toBe(5);
    expect(tdate.getNumOfWeeksOfMonth(2020, 2)).toBe(5);
    expect(tdate.getNumOfWeeksOfMonth(2019, 6)).toBe(6);
  });

  test('getDatesOfMonth', () => {
    const dates202001 = tdate.getDatesOfMonth(2020, 1);
    const dates202001only = tdate.getDatesOfMonth(2020, 1, true);
    const dates202002 = tdate.getDatesOfMonth(2020, 2);

    expect(dates202001[0]).toEqual({year: 2019, month: 12, date: 29, day: 0, week: 1});
    expect(dates202001[dates202001.length - 1]).toEqual({year: 2020, month: 2, date: 1, day: 6, week: 5});

    expect(dates202001only[0]).toEqual({year: 2020, month: 1, date: 1, day: 3, week: 1});
    expect(dates202001only[dates202001only.length - 1]).toEqual({year: 2020, month: 1, date: 31, day: 5, week: 5});

    expect(dates202002[0]).toEqual({year: 2020, month: 1, date: 26, day: 0, week: 1});
    expect(dates202002[dates202002.length - 1]).toEqual({year: 2020, month: 2, date: 29, day: 6, week: 5});
  });
});