import { NumberUtil } from './number.util';

type InTypes = string | number | Decimal | undefined | null;

/**
 * A simple arbitrary-precision Decimal class.
 * Inmutable class.
 */
export class Decimal {
  static MAX_DECIMALS = 10;
  static ERROR_PREFIX = '[DecimalError] ';

  private static NaN = 'NaN';

  protected intPart: string | null; // Can be: "NaN"
  protected decPart: string; // Can be: ""

  constructor(value: InTypes, precision?: number) {
    if (value === undefined || value === null) {
      this.intPart = null;
      this.decPart = '';
    } else if (value instanceof Decimal) {
      this.intPart = value.intPart;
      this.decPart = value.decPart;

      this.updatePrecision(precision);
    } else if (typeof value === 'number' || typeof value === 'string') {
      this.intPart = NumberUtil.getIntPart(value);
      this.decPart = NumberUtil.getDecPart(value);

      this.updatePrecision(precision);
    } else {
      this.intPart = Decimal.NaN;
      this.decPart = '';
    }
  }

  /**
   * Returns the number of digits of decimal part.
   */
  getPrecision(): number {
    return this.decPart.length;
  }

  /**
   * Internally change the number of decimals of the current value
   */
  protected updatePrecision(newPrecision: number | undefined | null): void {
    if (this.hasValue()) {
      const receivedPrecision = Decimal.checkParamPrecision(newPrecision);
      const currentPrecision = this.getPrecision();
      const finalPrecision = Math.min(receivedPrecision === null ? currentPrecision : receivedPrecision, Decimal.MAX_DECIMALS);

      if (currentPrecision < finalPrecision) {
        this.decPart = this.decPart.padEnd(finalPrecision, '0');
      } else if (currentPrecision > finalPrecision) {
        const newValue = (+(this.intPart + '.' + this.decPart)).toFixed(finalPrecision);
        this.intPart = NumberUtil.getIntPart(newValue);
        this.decPart = NumberUtil.getDecPart(newValue);
      }
    }
  }

  /**
   * Changes number of decimals. Round if necessary.
   *
   * @param newPrecision
   */
  changePrecision(newPrecision: number): Decimal {
    if (this.hasValue()) {
      const receivedPrecision = Decimal.checkParamPrecision(newPrecision);
      const currentPrecision = this.getPrecision();
      const finalPrecision = Math.min(receivedPrecision === null ? currentPrecision : receivedPrecision, Decimal.MAX_DECIMALS);

      if (currentPrecision < finalPrecision) {
        const newDecPart = this.decPart.padEnd(finalPrecision, '0');
        return new Decimal(this.intPart + '.' + newDecPart);
      } else if (currentPrecision > finalPrecision) {
        const newValue = (+(this.intPart + '.' + this.decPart)).toFixed(finalPrecision);
        return new Decimal(newValue);
      }
    }

    return this.clone();
  }

  /**
   * Does it contain a number? (NaN not included).
   */
  hasValue(): boolean {
    return this.intPart !== null && this.intPart !== Decimal.NaN;
  }

  isNaN(): boolean {
    return this.intPart !== null && this.intPart === Decimal.NaN;
  }

  isNull(): boolean {
    return this.intPart === null;
  }

  isPos(): boolean {
    return this.hasValue() && +this.intPart > 0;
  }

  /**
   * Return true if the value of this Decimal is 0.
   */
  isZero(): boolean {
    return this.getValue() === 0;
  }

  isNeg(): boolean {
    return this.hasValue() && +this.intPart < 0;
  }

  /**
   * Returns value as a number. NaN is a valid value.
   */
  getValue(): number | null {
    if (this.intPart === null) {
      return null;
    }

    if (this.intPart === Decimal.NaN) {
      return Number.NaN;
    }

    return +(this.intPart + '.' + this.decPart);
  }

  /**
   * Returns value as a integer (join int part with decimal part without decimal point).
   * NaN is a valid value.
   */
  getValueAsInt(): number | null {
    if (this.intPart === null) {
      return null;
    }

    if (this.intPart === Decimal.NaN) {
      return Number.NaN;
    }

    return +(this.intPart + this.decPart);
  }

  toString(dft: any = '', dftNaN: any = 'NaN'): string {
    if (this.intPart === null) {
      return dft;
    }

    if (this.intPart === Decimal.NaN) {
      return dftNaN;
    }

    return this.intPart + (this.decPart === '' ? '' : '.' + this.decPart);
  }

  clone(): Decimal {
    return new Decimal(this.toString(null));
  }

  trim(): Decimal {
    if (!this.hasValue()) {
      return this.clone();
    }

    const newValue = NumberUtil.trim(this.intPart + '.' + this.decPart);
    return new Decimal(newValue);
  }

  abs(): Decimal {
    if (this.intPart !== null && this.intPart !== Decimal.NaN) {
      return new Decimal(Math.abs(+this.intPart) + '.' + this.decPart);
    }

    return this.clone();
  }

  protected calc(value: InTypes, func: (op1: number, op2: number) => number): Decimal {
    if (!this.hasValue()) {
      return this.clone();
    }

    let dec1: Decimal = this;
    let dec2: Decimal = new Decimal(value);
    if (!dec2.hasValue()) {
      return dec2;
    }

    // Normalize with highest precision
    if (dec1.getPrecision() < dec2.getPrecision()) {
      dec1 = this.changePrecision(dec2.getPrecision());
    } else if (dec1.getPrecision() > dec2.getPrecision()) {
      dec2 = dec2.changePrecision(dec1.getPrecision());
    }

    const str = func(dec1.getValueAsInt(), dec2.getValueAsInt()) + '';
    const result = NumberUtil.setPrecisionToInt(str, dec1.getPrecision());

    return new Decimal(result);
  }

  /**
   * Returns a new Decimal object that represents the sum of this and an other Decimal object.
   * If objects have a different precision, they will be first converted to the highest.
   *
   * @param value
   */
  add(value: InTypes): Decimal {
    return this.calc(value, (op1: number, op2: number) => op1 + op2);
  }

  /**
   * Returns a new Decimal object that represents the difference of this and an other Decimal object.
   * If objects have a different precision, they will be first converted to the highest.
   *
   * @param value
   */
  sub(value: InTypes): Decimal {
    return this.calc(value, (op1: number, op2: number) => op1 - op2);
  }

  /**
   * Returns a new Decimal object that represents the multiplied of this and an other Decimal object.
   * If objects have a different precision, they will be first converted to the highest.
   *
   * @param value
   */
  mult(value: InTypes): Decimal {
    if (!this.hasValue()) {
      return this.clone();
    }

    const dec1: Decimal = this;
    const dec2: Decimal = new Decimal(value);
    if (!dec2.hasValue()) {
      return dec2;
    }

    const joinPrecision = dec1.getPrecision() + dec2.getPrecision();
    const result = NumberUtil.setPrecisionToInt(dec1.getValueAsInt() * dec2.getValueAsInt(), joinPrecision);

    return new Decimal(result);
  }

  /**
   * Returns a new Decimal object that represents the divided of this by an other Decimal object.
   * If objects have a different precision, they will be first converted to the highest.
   *
   * @param value
   */
  div(value: InTypes, precision?: number): Decimal {
    if (!this.hasValue()) {
      return this.clone();
    }

    const dec1: Decimal = this;
    const dec2: Decimal = new Decimal(value);
    if (!dec2.hasValue()) {
      return dec2;
    }

    if (dec2.isZero()) {
      throw new Error(Decimal.ERROR_PREFIX + 'Division by zero');
    }

    const result = dec1.getValue() / dec2.getValue();
    return new Decimal(result, precision);
  }

  percentage(percentage: any): Decimal {
    if (!this.hasValue()) {
      return this.clone();
    }

    if (!NumberUtil.isDigit(percentage)) {
      throw new Error(Decimal.ERROR_PREFIX + 'Percentage is not valid');
    }

    const convertedPercentage = NumberUtil.setPrecisionToInt(percentage, 2);
    return this.mult(convertedPercentage).trim();
  }

  protected compare(value: InTypes, func: (op1: number, op2: number) => boolean): boolean {
    let dec1: Decimal = this;
    let dec2: Decimal = new Decimal(value);

    if (dec1.isNaN() || dec2.isNaN()) {
      return false;
    }

    if (dec1.hasValue() && dec2.hasValue) {
      if (dec1.getPrecision() < dec2.getPrecision()) {
        dec1 = dec1.changePrecision(dec2.getPrecision());
      } else if (dec1.getPrecision() > dec2.getPrecision()) {
        dec2 = dec2.changePrecision(dec1.getPrecision());
      }
    }

    return func(dec1.getValueAsInt(), dec2.getValueAsInt());
  }

  /**
   * Checks whether the value represented by this object equals to the other.
   * Note: NaN always returns FALSE.
   *
   * @param value
   */
  eq(value: InTypes): boolean {
    return this.compare(value, (op1: number, op2: number) => op1 === op2);
  }

  /**
   * Checks whether the value represented by this object is less than the other.
   *
   * @param value
   */
  lt(value: InTypes): boolean {
    return this.compare(value, (op1: number, op2: number) => op1 < op2);
  }

  /**
   * Checks whether the value represented by this object is less than or equal to the other.
   *
   * @param value
   */
  lte(value: InTypes): boolean {
    return this.compare(value, (op1: number, op2: number) => op1 <= op2);
  }

  /**
   * Checks whether the value represented by this object is greater than the other.
   *
   * @param value
   */
  gt(value: InTypes): boolean {
    return this.compare(value, (op1: number, op2: number) => op1 > op2);
  }

  /**
   * Checks whether the value represented by this object is greater than or equal to the other.
   *
   * @param value
   */
  gte(value: InTypes): boolean {
    return this.compare(value, (op1: number, op2: number) => op1 >= op2);
  }

  /**
   * It is defined so that calling `JSON.stringify` on a Decimal object will automatically extract the relevant data.
   * Note: "NaN" is a valid value.
   */
  toJSON(): string | null {
    return this.toString(null, Number.NaN);
  }

  protected static checkParamPrecision(precision: number | undefined | null): number | null {
    if (precision === undefined || precision === null) {
      return null;
    }

    const realDecimals = parseInt(precision + '', 10);

    if (isNaN(realDecimals)) {
      throw Error(Decimal.ERROR_PREFIX + 'Decimals is not integer');
    } else if (realDecimals < 0) {
      throw Error(Decimal.ERROR_PREFIX + 'Min decimals is 0');
    } else if (Decimal.MAX_DECIMALS < realDecimals) {
      throw Error(`${Decimal.ERROR_PREFIX}Max decimals (${Decimal.MAX_DECIMALS}) exceed (${precision})`);
    } else {
      return realDecimals;
    }
  }
}
