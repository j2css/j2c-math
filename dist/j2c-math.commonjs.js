'use strict';

/** j2c-math Ⓒ Pierre-Yves Gérardy @license MIT*/
function length(a) {
  a = a.toString().match(/^(\d*\.\d+|\d+)(\%|\w*)$/);
  return new Length(a[1] - 0, a[2]);
}

function noop() {}

function Length(num, unit) {
  this.num = num;
  this.unit = unit;
  (Object.freeze || noop)(this);
}
var proto = Length.prototype;

proto.add = function(n) {
  n = (n instanceof Length) ? n : length(n);
  if (this.unit !== n.unit) throw new TypeError("unmatched units: '" + this.unit + "' and '" + n.unit + "'");
  return new Length(this.num + n.num, this.unit);
};

proto.sub = function(n) {
  n = (n instanceof Length) ? n : length(n);
  if (this.unit !== n.unit) throw new TypeError("unmatched units: '" + this.unit + "' and '" + n.unit + "'");
  return new Length(this.num - n.num, this.unit);
};

proto.mul = function(n) {
  n = this.num * n;
  if (n !== n) throw new TypeError('length.mul expetcs a scalar operand');
  return new Length(n, this.unit);
};

proto.div = function(n) {
  if (!(n instanceof Length)) n = length(n);
  if (n.unit && this.unit !== n.unit) throw new TypeError("unmatched units: '" + this.unit + "' and '" + n.unit + "'");
  if (n.num == 0)  throw new TypeError("division by 0")
  return n.unit ? this.num / n.num : new Length(this.num / n, this.unit);
};

proto.valueOf = proto.toString = function() {
  return this.num + (this.num === 0 ? '' : this.unit);
};



/*
Copyright © 2015 Pierre-Yves Gérardy

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the “Software”),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
*/

exports.length = length;