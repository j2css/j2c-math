#! /usr/bin/env node
/*eslint-env node*/
/*eslint no-console: 0*/

var fs = require('fs'),
  rollup = require('rollup'),
  outputs = [
    {
      rollupOptions: {
        format: 'iife',
        moduleName: 'j2cMath'
      },
      name: 'global',
      minify: true
    },
    {
      rollupOptions:{
        format: 'cjs'
      },
      name: 'commonjs',
      minify: true // To test the minified version,
                   //in case it was too aggressibely crushed.
    },
    {
      rollupOptions:{
        format: 'amd',
        name: 'j2c-math'
      },
      name: 'amd',
      minify: true
    }
  ];

var parsed = rollup.rollup({
  entry: 'j2c-math.js'
});


outputs.forEach(function (output) {
  parsed.then(function (bundle) {
    var result = bundle.generate(output.rollupOptions);
    fs.writeFileSync('dist/j2c-math.'  + output.name + '.js', result.code);
  }).then(null, function (e) {console.log(output.name, e);});
});

