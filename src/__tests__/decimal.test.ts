import { Decimal } from '../decimal';

describe('decimal', () => {
  const value_null = new Decimal(null);
  const value_NaN = new Decimal('euro');
  const value_5 = new Decimal(5);
  const value__5 = new Decimal(-5);
  const value_0 = new Decimal(0);
  const value_0_1 = new Decimal(0.1);
  const value__0_1 = new Decimal(-0.1);
  const value_1_2300 = new Decimal('1.2300');
  const value_1_ = new Decimal(1);
  const value_0_1230 = new Decimal(0.123);

  test('constructor', () => {
    expect(new Decimal(123.45, null).toString()).toBe('123.45');
    expect(new Decimal(123.45, 2).toString()).toBe('123.45');
    expect(new Decimal(123.45, 2.5).toString()).toBe('123.45');
    expect(() => new Decimal(10, -2)).toThrow(Decimal.ERROR_PREFIX + 'Min decimals is 0');
    expect(() => new Decimal(10, 20)).toThrow(`${Decimal.ERROR_PREFIX}Max decimals (${Decimal.MAX_DECIMALS}) exceed (20)`);
  });

  test('getPrecision', () => {
    expect(value_null.getPrecision()).toBe(0);
    expect(value_NaN.getPrecision()).toBe(0);
    expect(value_5.getPrecision()).toBe(0);
    expect(value__5.getPrecision()).toBe(0);
    expect(value_0.getPrecision()).toBe(0);
    expect(value_0_1.getPrecision()).toBe(1);
    expect(value__0_1.getPrecision()).toBe(1);
    expect(value_1_2300.getPrecision()).toBe(4);
    expect(value_1_.getPrecision()).toBe(0);
    expect(value_0_1230.getPrecision()).toBe(3);
  });

  test('getValueAsInt', () => {
    expect(new Decimal(undefined).getValueAsInt()).toBe(null);
    expect(value_null.getValueAsInt()).toBe(null);
    expect(value_NaN.getValueAsInt()).toBeNaN();

    expect(value_5.getValueAsInt()).toBe(5);
    expect(value__5.getValueAsInt()).toBe(-5);
    expect(value_0.getValueAsInt()).toBe(0);
    expect(value_0_1.getValueAsInt()).toBe(1);
    expect(value__0_1.getValueAsInt()).toBe(-1);
    expect(value_1_2300.getValueAsInt()).toBe(12300);
    expect(value_1_.getValueAsInt()).toBe(1);
    expect(value_0_1230.getValueAsInt()).toBe(123);
  });

  test('getValue', () => {
    expect(new Decimal(undefined).getValue()).toBe(null);
    expect(value_null.getValue()).toBe(null);
    expect(value_NaN.getValue()).toBeNaN();

    expect(value_5.getValue()).toBe(5);
    expect(value__5.getValue()).toBe(-5);
    expect(value_0.getValue()).toBe(0);
    expect(value_0_1.getValue()).toBe(0.1);
    expect(value__0_1.getValue()).toBe(-0.1);
    expect(value_1_2300.getValue()).toBe(1.23);
    expect(value_1_.getValue()).toBe(1);
    expect(value_0_1230.getValue()).toBe(0.123);
  });

  test('toString', () => {
    expect(new Decimal(undefined).toString()).toBe('');

    expect(value_null.toString()).toBe('');
    expect(value_null.toString('NULL')).toBe('NULL');
    expect(value_null.toString(null)).toBe(null);

    expect(value_NaN.toString()).toBe('NaN');
    expect(value_NaN.toString('--', '?')).toBe('?');
    expect(value_NaN.toString('--', null)).toBe(null);

    expect(value_5.toString()).toBe('5');
    expect(value__5.toString()).toBe('-5');
    expect(value_0.toString()).toBe('0');
    expect(value_0_1.toString()).toBe('0.1');
    expect(value__0_1.toString()).toBe('-0.1');
    expect(value_1_2300.toString()).toBe('1.2300');
    expect(value_1_.toString()).toBe('1');
    expect(value_0_1230.toString()).toBe('0.123');
    expect(new Decimal('.0000').toString()).toBe('0.0000');
  });

  test('changePrecision', () => {
    expect(value_null.changePrecision(2).toString()).toBe('');
    expect(value_NaN.changePrecision(2).toString()).toBe('NaN');

    expect(value_5.changePrecision(2).toString()).toBe('5.00');
    expect(value__5.changePrecision(2).toString()).toBe('-5.00');
    expect(value_0.changePrecision(2).toString()).toBe('0.00');
    expect(value_0_1.changePrecision(2).toString()).toBe('0.10');
    expect(value__0_1.changePrecision(2).toString()).toBe('-0.10');
    expect(value_1_2300.changePrecision(2).toString()).toBe('1.23');
    expect(value_1_.changePrecision(2).toString()).toBe('1.00');
    expect(value_0_1230.changePrecision(2).toString()).toBe('0.12');
    expect(new Decimal('.0000').changePrecision(2).toString()).toBe('0.00');
    expect(new Decimal('.459').changePrecision(2).toString()).toBe('0.46');
    expect(new Decimal('.455').changePrecision(2).toString()).toBe('0.46');
    expect(new Decimal('.454').changePrecision(2).toString()).toBe('0.45');
  });

  test('hasValue', () => {
    expect(new Decimal(undefined).hasValue()).toBe(false);
    expect(value_null.hasValue()).toBe(false);
    expect(value_NaN.hasValue()).toBe(false);
    expect(value_5.hasValue()).toBe(true);
  });

  test('isNaN', () => {
    expect(new Decimal(undefined).isNaN()).toBe(false);
    expect(value_null.isNaN()).toBe(false);
    expect(value_NaN.isNaN()).toBe(true);
    expect(value_5.isNaN()).toBe(false);
  });

  test('isNull', () => {
    expect(new Decimal(undefined).isNull()).toBe(true);
    expect(value_null.isNull()).toBe(true);
    expect(value_NaN.isNull()).toBe(false);
    expect(value_5.isNull()).toBe(false);
  });

  test('isPos', () => {
    expect(new Decimal(undefined).isPos()).toBe(false);
    expect(value_null.isPos()).toBe(false);
    expect(value_NaN.isPos()).toBe(false);
    expect(value_5.isPos()).toBe(true);
    expect(value_0.isPos()).toBe(false);
    expect(value__5.isPos()).toBe(false);
  });

  test('isZero', () => {
    expect(new Decimal(undefined).isZero()).toBe(false);
    expect(value_null.isZero()).toBe(false);
    expect(value_NaN.isZero()).toBe(false);
    expect(value_5.isZero()).toBe(false);
    expect(value_0.isZero()).toBe(true);
    expect(value__5.isZero()).toBe(false);
  });

  test('isNeg', () => {
    expect(new Decimal(undefined).isNeg()).toBe(false);
    expect(value_null.isNeg()).toBe(false);
    expect(value_NaN.isNeg()).toBe(false);
    expect(value_5.isNeg()).toBe(false);
    expect(value_0.isNeg()).toBe(false);
    expect(value__5.isNeg()).toBe(true);
  });

  test('trim', () => {
    expect(new Decimal(undefined).trim().isNull()).toBe(true);
    expect(value_null.trim().isNull()).toBe(true);
    expect(value_NaN.trim().isNull()).toBe(false);
    expect(value_5.trim().toString()).toBe('5');
    expect(value_1_2300.trim().toString()).toBe('1.23');
    expect(new Decimal('.0000').trim().toString()).toBe('0');
    expect(new Decimal('04.0010').trim().toString()).toBe('4.001');
  });

  test('toJSON', () => {
    expect(new Decimal(undefined).toJSON()).toBe(null);
    expect(value_null.toJSON()).toBe(null);
    expect(value_NaN.toJSON()).toBeNaN();
    expect(value_5.toJSON()).toBe('5');
    expect(value_1_2300.toJSON()).toBe('1.2300');
    expect(new Decimal('.0000').toJSON()).toBe('0.0000');
    expect(new Decimal('04.0010').toJSON()).toBe('4.0010');
  });

  describe('operations', () => {
    test('abs', () => {
      expect(value_null.abs().isNull()).toBe(true);
      expect(value_NaN.abs().isNaN()).toBe(true);
      expect(value_5.abs().toString()).toBe('5');
      expect(value__5.abs().toString()).toBe('5');
      expect(value_0.abs().toString()).toBe('0');
      expect(value_0_1.abs().toString()).toBe('0.1');
      expect(value__0_1.abs().toString()).toBe('0.1');
    });

    test('add', () => {
      expect(value_null.add(5).isNull()).toBe(true);
      expect(value_NaN.add(5).isNaN()).toBe(true);
      expect(value_5.add(5).toString()).toBe('10');
      expect(value__5.add(5).toString()).toBe('0');
      expect(value_0.add(5).toString()).toBe('5');
      expect(value_0_1.add(5).toString()).toBe('5.1');
      expect(value_0_1.add(0.2).toString()).toBe('0.3');
      expect(value__0_1.add(5).toString()).toBe('4.9');
    });

    test('sub', () => {
      expect(value_null.sub(5).isNull()).toBe(true);
      expect(value_NaN.sub(5).isNaN()).toBe(true);
      expect(value_5.sub(5).toString()).toBe('0');
      expect(value__5.sub(5).toString()).toBe('-10');
      expect(value_0.sub(5).toString()).toBe('-5');
      expect(value_0_1.sub(5).toString()).toBe('-4.9');
      expect(value_0_1.sub(0.2).toString()).toBe('-0.1');
      expect(value__0_1.sub(5).toString()).toBe('-5.1');
      expect(value__0_1.sub(-5).toString()).toBe('4.9');
    });

    test('mult', () => {
      expect(value_null.mult(5).isNull()).toBe(true);
      expect(value_NaN.mult(5).isNaN()).toBe(true);
      expect(value_5.mult(5).toString()).toBe('25');
      expect(value__5.mult(5).toString()).toBe('-25');
      expect(value_0.mult(5).toString()).toBe('0');
      expect(value_0_1.mult(5).toString()).toBe('0.5');
      expect(value_0_1.mult(0.2).toString()).toBe('0.02');
      expect(value__0_1.mult(5).toString()).toBe('-0.5');
      expect(value_0_1.mult(-0.15).toString()).toBe('-0.015');
      expect(value__0_1.mult(-0.15).toString()).toBe('0.015');
    });

    test('div', () => {
      expect(value_null.div(5).isNull()).toBe(true);
      expect(value_NaN.div(5).isNaN()).toBe(true);
      expect(value_5.div(5).toString()).toBe('1');
      expect(value_5.div(1).toString()).toBe('5');
      expect(value_5.div(0.1).toString()).toBe('50');
      expect(value_5.div(0.9, 3).toString()).toBe('5.556');
      expect(() => value_5.div(0).toString()).toThrow(Decimal.ERROR_PREFIX + 'Division by zero');
      expect(value__5.div(5).toString()).toBe('-1');
      expect(value_0_1.div(5).toString()).toBe('0.02');
      expect(value_0_1.div(0.2).toString()).toBe('0.5');
      expect(value__0_1.div(5).toString()).toBe('-0.02');
      expect(value_0_1.div(-0.15, 10).toString()).toBe('-0.6666666667');
      expect(value_0_1.div(-0.15, 1).toString()).toBe('-0.7');
      expect(value__0_1.div(-0.15, 10).toString()).toBe('0.6666666667');
    });

    test('percentage', () => {
      expect(value_null.percentage(5).isNull()).toBe(true);
      expect(value_NaN.percentage(5).isNaN()).toBe(true);
      expect(value_5.percentage(20).toString()).toBe('1');
      expect(value__5.percentage(20).toString()).toBe('-1');
      expect(value_5.percentage(10).toString()).toBe('0.5');
      expect(value_5.percentage(15).toString()).toBe('0.75');
    });
  });

  describe('compare', () => {
    test('eq', () => {
      expect(value_null.eq(null)).toBe(true);
      expect(value_NaN.eq('xx')).toBe(false); // NaN !== NaN
      expect(value_5.eq('5.00')).toBe(true);
      expect(value_5.eq('5.001')).toBe(false);
      expect(value_0.eq('.00')).toBe(true);
      expect(value_0_1230.eq('0.123')).toBe(true);
      expect(value_0_1230.eq('0.1234')).toBe(false);
    });

    test('lt', () => {
      expect(value_null.lt(null)).toBe(false);
      expect(value_null.lt(3.2)).toBe(true);
      expect(value_NaN.lt('xx')).toBe(false);
      expect(value_5.lt('5.01')).toBe(true);
      expect(value_5.lt('5.00')).toBe(false);
      expect(value_5.lt('4.9')).toBe(false);
      expect(value_0.lt('.00')).toBe(false);
      expect(value_0_1230.lt('0.123')).toBe(false);
      expect(value_0_1230.lt('0.1234')).toBe(true);
    });

    test('lte', () => {
      expect(value_null.lte(null)).toBe(true);
      expect(value_null.lte(3.2)).toBe(true);
      expect(value_NaN.lte('xx')).toBe(false);
      expect(value_5.lte('5.01')).toBe(true);
      expect(value_5.lte('5.00')).toBe(true);
      expect(value_5.lte('4.9')).toBe(false);
      expect(value_0.lte('.00')).toBe(true);
      expect(value_0_1230.lte('0.123')).toBe(true);
      expect(value_0_1230.lte('0.1234')).toBe(true);
    });

    test('gt', () => {
      expect(value_null.gt(null)).toBe(false);
      expect(value_null.gt(3.2)).toBe(false);
      expect(value_NaN.gt('xx')).toBe(false);
      expect(value_5.gt('5.01')).toBe(false);
      expect(value_5.gt('5.00')).toBe(false);
      expect(value_5.gt('4.9')).toBe(true);
      expect(value_0.gt('.00')).toBe(false);
      expect(value_0_1230.gt('0.123')).toBe(false);
      expect(value_0_1230.gt('0.1234')).toBe(false);
    });

    test('gte', () => {
      expect(value_null.gte(null)).toBe(true);
      expect(value_null.gte(3.2)).toBe(false);
      expect(value_NaN.gte('xx')).toBe(false);
      expect(value_5.gte('5.01')).toBe(false);
      expect(value_5.gte('5.00')).toBe(true);
      expect(value_5.gte('4.9')).toBe(true);
      expect(value_0.gte('.00')).toBe(true);
      expect(value_0_1230.gte('0.123')).toBe(true);
      expect(value_0_1230.gte('0.1234')).toBe(false);
    });
  });
});
