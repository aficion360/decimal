# Decimal

A simple arbitrary-precision Decimal type for TypeScript.

- Accept `Number`, `String`, `Null` and `NaN` values.
- No dependecies.
- Immutable data structure.
- Secure operations, like add, substract or multiply. Ex: `0.1 + 0.2 = 0.3`.
- Tested classes.


## Use

Create instances:
```
const decNull = new Decimal(null);
const decNaN = new Decimal('euro');
const dec10 = new Decimal(10);
const dec30 = new Decimal('30 euros');
```

Chain operations:
```
// Output: "0.3"
new Decimal(0.1).add(0.2).toString();
```

**Afición 360**

_Enjoy it ;-)_
