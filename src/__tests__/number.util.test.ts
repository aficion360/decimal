import { NumberUtil } from '../number.util';

describe('number.util', () => {
  test('isDigit', () => {
    expect(NumberUtil.isDigit(null)).toBe(false);
    expect(NumberUtil.isDigit(undefined)).toBe(false);
    expect(NumberUtil.isDigit(true)).toBe(false);
    expect(NumberUtil.isDigit(false)).toBe(false);
    expect(NumberUtil.isDigit('magic')).toBe(false);
    expect(NumberUtil.isDigit(['magic'])).toBe(false);
    expect(NumberUtil.isDigit({})).toBe(false);

    expect(NumberUtil.isDigit(123)).toBe(true);
    expect(NumberUtil.isDigit(-123)).toBe(false);
    expect(NumberUtil.isDigit(1.23)).toBe(false);
    expect(NumberUtil.isDigit('123')).toBe(true);
    expect(NumberUtil.isDigit('-123')).toBe(false);
    expect(NumberUtil.isDigit('1.23')).toBe(false);
  });

  test('isInteger', () => {
    expect(NumberUtil.isInteger(null)).toBe(false);
    expect(NumberUtil.isInteger(undefined)).toBe(false);
    expect(NumberUtil.isInteger(true)).toBe(false);
    expect(NumberUtil.isInteger(false)).toBe(false);
    expect(NumberUtil.isInteger('magic')).toBe(false);
    expect(NumberUtil.isInteger(['magic'])).toBe(false);
    expect(NumberUtil.isInteger({})).toBe(false);

    expect(NumberUtil.isInteger(123)).toBe(true);
    expect(NumberUtil.isInteger(-123)).toBe(true);
    expect(NumberUtil.isInteger(1.23)).toBe(false);
    expect(NumberUtil.isInteger('123')).toBe(true);
    expect(NumberUtil.isInteger('-123')).toBe(true);
    expect(NumberUtil.isInteger('1.23')).toBe(false);
  });

  test('isNumber', () => {
    expect(NumberUtil.isNumber(null)).toBe(false);
    expect(NumberUtil.isNumber(undefined)).toBe(false);
    expect(NumberUtil.isNumber(true)).toBe(false);
    expect(NumberUtil.isNumber(false)).toBe(false);
    expect(NumberUtil.isNumber('magic')).toBe(false);
    expect(NumberUtil.isNumber(['magic'])).toBe(false);
    expect(NumberUtil.isNumber({})).toBe(false);

    expect(NumberUtil.isNumber(123)).toBe(true);
    expect(NumberUtil.isNumber(-123)).toBe(true);
    expect(NumberUtil.isNumber(0.123)).toBe(true);
    expect(NumberUtil.isNumber(1.23)).toBe(true);
    expect(NumberUtil.isNumber('123')).toBe(true);
    expect(NumberUtil.isNumber('-123')).toBe(true);
    expect(NumberUtil.isNumber('1.23')).toBe(true);
  });

  test('getIntPart', () => {
    expect(NumberUtil.getIntPart(null)).toBe(null);
    expect(NumberUtil.getIntPart(undefined)).toBe(null);
    expect(NumberUtil.getIntPart(false)).toBe('NaN');
    expect(NumberUtil.getIntPart('euros')).toBe('NaN');
    expect(NumberUtil.getIntPart(['euros'])).toBe('NaN');
    expect(NumberUtil.getIntPart({})).toBe('NaN');

    expect(NumberUtil.getIntPart(12345)).toBe('12345');
    expect(NumberUtil.getIntPart(0.123)).toBe('0');
    expect(NumberUtil.getIntPart(0.123)).toBe('0');
    expect(NumberUtil.getIntPart(0.01)).toBe('0');
    expect(NumberUtil.getIntPart(-0.01)).toBe('-0');
    expect(NumberUtil.getIntPart('0.010')).toBe('0');
    expect(NumberUtil.getIntPart('.0000')).toBe('0');
    expect(NumberUtil.getIntPart('012.9 euros')).toBe('12');
  });

  test('getDecPart', () => {
    expect(NumberUtil.getDecPart(null)).toBe('');
    expect(NumberUtil.getDecPart(undefined)).toBe('');
    expect(NumberUtil.getDecPart(false)).toBe('');
    expect(NumberUtil.getDecPart('magic')).toBe('');
    expect(NumberUtil.getDecPart(['magic'])).toBe('');
    expect(NumberUtil.getDecPart({})).toBe('');
    expect(NumberUtil.getDecPart(12345)).toBe('');

    expect(NumberUtil.getDecPart(0.123)).toBe('123');
    expect(NumberUtil.getDecPart(0.123)).toBe('123');
    expect(NumberUtil.getDecPart(0.1)).toBe('1');
    expect(NumberUtil.getDecPart(0.01)).toBe('01');
    expect(NumberUtil.getDecPart(-0.01)).toBe('01');
    expect(NumberUtil.getDecPart('0.010')).toBe('010');
  });

  test('countDecimals', () => {
    expect(NumberUtil.countDecimals(null)).toBe(0);
    expect(NumberUtil.countDecimals(undefined)).toBe(0);
    expect(NumberUtil.countDecimals(false)).toBe(0);
    expect(NumberUtil.countDecimals('magic')).toBe(0);
    expect(NumberUtil.countDecimals(['magic'])).toBe(0);
    expect(NumberUtil.countDecimals({})).toBe(0);
    expect(NumberUtil.countDecimals(12345)).toBe(0);

    expect(NumberUtil.countDecimals(0.123)).toBe(3);
    expect(NumberUtil.countDecimals(0.123)).toBe(3);
    expect(NumberUtil.countDecimals(0.1)).toBe(1);
    expect(NumberUtil.countDecimals(0.01)).toBe(2);
    expect(NumberUtil.countDecimals('0.010')).toBe(3);
  });

  test('trim', () => {
    expect(NumberUtil.trim(undefined)).toBe('');
    expect(NumberUtil.trim(null)).toBe('');
    expect(NumberUtil.trim('1')).toBe('1');
    expect(NumberUtil.trim('01')).toBe('1');
    expect(NumberUtil.trim('1.23')).toBe('1.23');
    expect(NumberUtil.trim('1.230000')).toBe('1.23');
    expect(NumberUtil.trim('1.0000')).toBe('1');
    expect(NumberUtil.trim('0.0000')).toBe('0');
    expect(NumberUtil.trim('.0000')).toBe('0');
    expect(NumberUtil.trim('.0010')).toBe('0.001');
  });

  test('setPrecisionToInt', () => {
    expect(NumberUtil.setPrecisionToInt(12345, 2)).toBe('123.45');
    expect(NumberUtil.setPrecisionToInt('-10', 0)).toBe('-10');
    expect(NumberUtil.setPrecisionToInt('dinero', 2)).toBe('NaN');
    expect(NumberUtil.setPrecisionToInt('12345', 2)).toBe('123.45');
    expect(NumberUtil.setPrecisionToInt('12345', 5)).toBe('0.12345');
    expect(NumberUtil.setPrecisionToInt('12345', 7)).toBe('0.0012345');
    expect(NumberUtil.setPrecisionToInt('-12345', 2)).toBe('-123.45');
    expect(NumberUtil.setPrecisionToInt('-12345', 5)).toBe('-0.12345');
    expect(NumberUtil.setPrecisionToInt('-12345', 7)).toBe('-0.0012345');
  });
});
