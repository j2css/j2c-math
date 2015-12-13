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

`length` objects also have `.sub(matching_length)`, `.mul(number)` and `.div(number)` methods. `matching_length` must be a `length` object or a string representing a length with a matching unit.

`.toString()` and `.valueOf()` return the corresponding length as a string.


## License: MIT
