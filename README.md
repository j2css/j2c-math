# j2c-math


A [j2c](http://j2c.py.gy) companion library to do math on [CSS lengths](https://developer.mozilla.org/en-US/docs/Web/CSS/length) like `2em` or `20%`.

[![Join the chat at https://gitter.im/j2css/j2c](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/j2css/j2c?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/j2css/j2c-math.svg?branch=master)](https://travis-ci.org/j2css/j2c-math)
[![bitHound Overalll Score](https://www.bithound.io/github/j2css/j2c-math/badges/score.svg)](https://www.bithound.io/github/j2css/j2c-math)

## Installation

```Shell
$ npm install --save j2c-math
```

## Usage

```JS
import {length} form 'j2c-math';
import j2c from 'j2c';

let baseWidth = length('4em');
let pageWidth = baseWidth.mul(10);        // base * 10, returns a new object.
let navWidth  = baseWidth.mul(2);         // base * 2
let mainWidth = pageWidth.sub(navWidth);  // page - side

// j2c treats these objects as values.

sheet = j2c.sheet({
    " body": {
        margin: '0 auto',
        width: baseWidth,

        " nav": {
            float: 'left',
            width: sideWidth
        },
        " main": {
            float: 'left',
            width: mainWidth
        }
    }
})
```

Becomes

```CSS
body {
    margin: 0 auto;
    width: 40em;
}
body nav{
    float: left;
    width: 8em;
}
body main{
    float: left;
    width: 32em;
}
```

### Factory

```JS
let len = length('2em') // returns a Length object.
```

The `length` factory takes as input strings representing CSS lengths, like `'2em'`, `'3%'`. and returns a new `Length` object, which is immutable.

### Methods

The following methods are supported; they all return a new value:

##### `len.add(another: length|string) : length`

If `another` is a string it must represent a length.

Units must match.

##### `en.sub(another: length|string) : length`

As above.

##### `len.mul(n: number|string) : length` 

If `n` is a string, it must represent a number, not a length.

##### `len.div(n: number|string) : length      `

Likewise.

Division by 0 throws.

##### `len.div(another: length|string) : number`

Units must match.

Division by 0 throws.

##### `len.toString()` and `len.valueOf()` 

Return the corresponding length as a string. `j2c` actually uses `.valueOf()` under the hood to get the String representation.

```JS
console.log('' + length('6em').div(3)); // '2em'
```

## License: MIT
