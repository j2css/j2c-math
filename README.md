# j2c-math

[![Join the chat at https://gitter.im/j2css/j2c](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/j2css/j2c?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A [j2c](http://j2c.py.gy) companion library to do math on CSS lengths like `2em` or `20%`.

## Installation

```Shell
$ npm install --save j2c-math
```

## Usage

```JS
import {length} form 'j2c-math';
import j2c from 'j2c';

var R = length('2em');

sheet = j2c.sheet({"@global": {
    ".foo": {
        padding: {
            left R.add('3em'), // Note that there's no need to convert to String
                               // j2c does it for you.
            rigth: R           // still 2em, lengths are immutable.
        }
    }
}})
```
Becomes
```CSS
.foo {
    padding-left: 5em;
    padding-right: 2em;
}
```

The following methods are supported:

- `resultLength = length(aCssLenght).add(anotherLength)` where the units of all lengths are identical.
- `resultLength = length(aCssLenght).sub(anotherLength)` as above, but subtracts.
- `resultLength = length(aCssLenght).mul(number)` where number is a JS number, a string that represents a number or a j2c-math length with no unit (`length('2')`).
- `resultLength = length(aCssLenght).div(number)` as the `.mul()`, but divides. Division by 0 throws.
- `number = length(aCssLenght).div(anotherLength)` units must match. Division by 0 throws.

`.toString()` and `.valueOf()` return the corresponding length as a string.


## License: MIT
