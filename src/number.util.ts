export class NumberUtil {
  /* --------------------------------------------------------------------------
   Integers
   -------------------------------------------------------------------------- */

  /**
   * Returns TRUE if it only has digits (no accept negative integer).
   */
  static isDigit(str: any): boolean {
    return /^\d+$/.test(str);
  }

  /**
   * Returns TRUE if it is a positive or negative integer.
   */
  static isInteger(str: any) {
    return /^-?\d+$/.test(str);
  }

  /* --------------------------------------------------------------------------
   Floats
   -------------------------------------------------------------------------- */

  static isNumber(value: any): boolean {
    return !isNaN(value - parseFloat(value));
  }

  /**
   * Returns the integer part of a number (previous to decimal point).
   * Does not apply rounding.
   *
   * Ex:
   *      '012.9 euros' > '12'
   *      'euros' > NaN
   *      '-0.010' > '-0'
   */
  static getIntPart(value: any): string | null {
    if (value === undefined || value === null) {
      return null;
    }

    // Avoid NaN for ex: '.01'
    if (typeof value === 'string' && value.length && value[0] === '.') {
      value = '0' + value;
    }

    const result = parseInt(value, 10);

    if (Object.is(result, -0)) {
      return '-0';
    }

    return result + '';
  }

  /**
   * Returns the decimal part of a number. If it does not return the empty string.
   */
  static getDecPart(value: any): string {
    if (value === undefined || value === null) {
      return '';
    }

    const [, decimals] = value.toString().split('.');

    return decimals || '';
  }

  /**
   * Returns how many decimals digits a number has.
   */
  static countDecimals(value: any): number {
    if (value === undefined || value === null) {
      return 0;
    }

    const [, decimals] = value.toString().split('.');

    return (decimals && decimals.length) || 0;
  }

  static trim(str: string, decimalSep: string = '.'): string {
    if (str === undefined || str === null) {
      return '';
    }

    // Remove leading zeros
    let result: string = str.replace(/^0+/, '');

    if (result.startsWith(decimalSep)) {
      result = '0' + result;
    }

    // Remove decimal zeros
    let regExp = new RegExp('(\\' + decimalSep + '[0-9]*?)0+$');
    result = result.replace(regExp, '$1');

    // Remove the decimal separator
    regExp = new RegExp('\\' + decimalSep + '$');
    result = result.replace(regExp, '');

    return result;
  }

  /**
   * Add the decimal point to an integer. Account 'precision' digits on the left.
   *
   * @param value integer
   * @param precision integer
   */
  static setPrecisionToInt(value: string | number, precision: number): string {
    let str = value + '';
    if (NumberUtil.isInteger(str)) {
      const neg = str.startsWith('-');
      if (neg) {
        str = str.substring(1);
      }

      if (precision === 0) {
        return (neg ? '-' : '') + str;
      }

      const index = str.length - precision;
      if (0 < index) {
        return (neg ? '-' : '') + str.substring(0, index) + '.' + str.substring(index);
      } else if (0 > index) {
        return (neg ? '-' : '') + '0.' + str.padStart(precision, '0');
      } else {
        return (neg ? '-' : '') + '0.' + str;
      }
    } else {
      return 'NaN';
    }
  }
}
