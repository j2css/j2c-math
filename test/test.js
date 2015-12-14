/*eslint-env node, mocha */


var expect = require('expect.js');

function check(a,b) {expect(a).to.be(b);}

[
  '../dist/j2c-math.commonjs',
  '../dist/j2c-math.commonjs.min'
].forEach(function (lib) {
  var length = require(lib).length;



  ///////////////////////////////////
  /**/  suite('Constructor, ');  /**/
  ///////////////////////////////////

  test('With unit', function () {
    var a = length('1em');
    check(a.unit, 'em');
    check(a.num, 1);
  });

  test('With percent', function () {
    var a = length('1%');
    check(a.unit, '%');
    check(a.num, 1);
  });

  test('Malformed inputs', function () {
    expect(function(){length('em');}).to.throwException(function(e){
      expect(e).to.be.a(TypeError);
      expect(e.message).to.contain('malformed input');
    });
    expect(function(){length('1');}).to.throwException();
    expect(function(){length(1);}).to.throwException();
    expect(function(){length('1$');}).to.throwException();
    expect(function(){length('1em%');}).to.throwException();
  });


  if (Object.freeze) {
    test('Immutable', function () {
      var a = length('1em');
      a.unit  = 'px';
      check(a.unit, 'em');
    });
  }

  test('Identity if another lenght is passed', function () {
    var a = length('1em');
    var b = length(a);
    check(a, b);
  });



  ///////////////////////////////////////////
  /**/  suite('toString conversion, ');  /**/
  ///////////////////////////////////////////

  test('1em toString()',function () {
    check(length('1em').toString(), '1em');
  });

  test('1% toString()',function () {
    check(length('1%').toString(), '1%');
  });

  test('1em valueOf()',function () {
    check(length('1em') + '', '1em');
  });

  test('1% valueOf()',function () {
    check(length('1%') + '', '1%');
  });

  test('zero should lose its unit when toString()ed', function () {
    check(length('0%') + '', '0');
  });

  test('parse float with unit', function () {
    check(length('1.1px') + '', '1.1px');
  });

  test('parse float without leading digit, with unit', function () {
    check(length('.1rem') + '', '0.1rem');
  });



  /////////////////////////////////
  /**/  suite('Additions, ');  /**/
  /////////////////////////////////

  test('1em + 1em', function () {
    check(length('1em').add('1em') + '', '2em');
  });

  test('1em + 1 should fail', function () {
    expect(function () {
      length('1em').add('1');
    }).to.throwException(function (e) { // get the exception object
      expect(e).to.be.a(TypeError);
      expect(e.message).to.contain('malformed input');
    });
  });

  test('1em + 1px should fail', function () {
    expect(function () {
      length('1em').add('1px');
    }).to.throwException(function (e) { // get the exception object
      expect(e).to.be.a(TypeError);
      expect(e.message).to.contain('mismatched units');
    });
  });

  test('immutability', function () {
    var a = length('1em');
    var b = a.add('1em');
    check('' + a, '1em');
    check('' + b, '2em');
  });

  test('add two length objects', function () {
    var a = length('1em');
    var b = length('2em');
    check(a.add(b) + '', '3em');
  });



  ////////////////////////////////////
  /**/  suite('Subtractions, ');  /**/
  ////////////////////////////////////

  test('2em - 1em', function () {
    check(length('2em').sub('1em') + '', '1em');
  });

  test('1em - 1 should fail', function () {
    expect(function () {
      length('1em').sub('1');
    }).to.throwException(function (e) { // get the exception object
      expect(e).to.be.a(TypeError);
      expect(e.message).to.contain('malformed input');
    });
  });

  test('1em - 1px should fail', function () {
    expect(function () {
      length('1em').sub('1px');
    }).to.throwException(function (e) { // get the exception object
      expect(e).to.be.a(TypeError);
      expect(e.message).to.contain('mismatched units');
    });
  });

  test('immutability', function () {
    var a = length('1em');
    var b = a.sub('1em');
    check('' + a, '1em');
    check('' + b, '0');
  });

  test('subtract two length objects', function () {
    var a = length('1em');
    var b = length('2em');
    check(a.sub(b) + '', '-1em');
  });



  ///////////////////////////////////////
  /**/  suite('Multiplications, ');  /**/
  ///////////////////////////////////////

  test('2em * 2', function () {
    check(length('2em').mul(2) + '', '4em');
  });

  test('1em * 1em should fail', function () {
    expect(function () {
      length('1em').mul('1em');
    }).to.throwException(function (e) { // get the exception object
      expect(e).to.be.a(TypeError);
      expect(e.message).to.contain('scalar operand expected');
    });
  });



  /////////////////////////////////
  /**/  suite('Divisions, ');  /**/
  /////////////////////////////////

  test('2em / 2', function () {
    check(length('2em').div(2) + '', '1em');
  });

  test('2em / 1em', function () {
    check(length('2em').div('1em'), 2);
  });

  test('2em / length(1em)', function () {
    check(length('2em').div(length('1em')), 2);
  });

  test('1em / 1px should fail', function () {
    expect(function () {
      length('1em').div('1px');
    }).to.throwException(function (e) { // get the exception object
      expect(e).to.be.a(TypeError);
    });
  });
});