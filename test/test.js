/*eslint-env node, mocha */

var expect = require('expect.js');

function check(a,b) {expect(a).to.be(b);}

[
  '../dist/j2c-math.commonjs',
  '../dist/j2c-math.commonjs.min'
].forEach(function (lib) {
  var length = require(lib).length;




  //////////////////////////////////////////
  /**/  suite('toString conversion ');  /**/
  //////////////////////////////////////////

  test('no unit, toString()', function () {
    check(length('1').toString(), '1');
  });

  test('no unit, valueOf()', function () {
    check(length('1') + '', '1');
  });

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

  test('parse float', function () {
    check(length('1.1') + '', '1.1');
  });

  test('parse float without leading digit', function () {
    check(length('.1') + '', '0.1');
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


  test('no units, add string', function () {
    check(length('1').add('1') + '', '2');
  });

  test('no units, add number', function () {
    check(length('1').add(1) + '', '2');
  });

  test('1em + 1em', function () {
    check(length('1em').add('1em') + '', '2em');
  });

  test('1em + 1 should fail', function () {
    expect(function () {
      length('1em').add('1');
    }).to.throwException(function (e) { // get the exception object
      expect(e).to.be.a(TypeError);
      expect(e.message).to.contain('unmatched units');
    });
  });

  test('1em + 1px should fail', function () {
    expect(function () {
      length('1em').add('1px');
    }).to.throwException(function (e) { // get the exception object
      expect(e).to.be.a(TypeError);
      expect(e.message).to.contain('unmatched units');
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

  test('no units, subtract string', function () {
    check(length('1').sub('1') + '', '0');
  });

  test('no units, subtract number', function () {
    check(length('2').sub(1) + '', '1');
  });

  test('2em - 1em', function () {
    check(length('2em').sub('1em') + '', '1em');
  });

  test('1em - 1 should fail', function () {
    expect(function () {
      length('1em').sub('1');
    }).to.throwException(function (e) { // get the exception object
      expect(e).to.be.a(TypeError);
      expect(e.message).to.contain('unmatched units');
    });
  });

  test('1em - 1px should fail', function () {
    expect(function () {
      length('1em').sub('1px');
    }).to.throwException(function (e) { // get the exception object
      expect(e).to.be.a(TypeError);
      expect(e.message).to.contain('unmatched units');
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

  test('no units, multiply by a string', function () {
    check(length('1').mul('1') + '', '1');
  });

  test('no units, multiply with number', function () {
    check(length('2').mul(1) + '', '2');
  });

  test('2em * 2', function () {
    check(length('2em').mul(2) + '', '4em');
  });

  test('1em * 1em should fail', function () {
    expect(function () {
      length('1em').mul('1em');
    }).to.throwException(function (e) { // get the exception object
      expect(e).to.be.a(TypeError);
    });
  });



    /////////////////////////////////
    /*suite('Divisions, ');  /**/
    /////////////////////////////////


  test('no units, divide by a string', function () {
    check(length('6').div('2') + '', '3');
  });

  test('no units, divide by a number', function () {
    check(length('6').div(2) + '', '3');
  });

  test('2em / 2', function () {
    check(length('2em').div(2) + '', '1em');
  });
  test('2em / length(2)', function () {
    check(length('2em').div(length(2)) + '', '1em');
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




