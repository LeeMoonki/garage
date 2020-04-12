import cjs from '../cjs/tool-case';

describe('access', () => {
  test('cjs', () => {
    expect(cjs.tarray).toBeTruthy();
    expect(cjs.tdate).toBeTruthy();
    expect(cjs.tobject).toBeTruthy();
    expect(cjs.tother).toBeTruthy();
    expect(cjs.tstring).toBeTruthy();
    expect(cjs.taudio).toBeTruthy();
  });
});
