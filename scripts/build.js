#! /usr/bin/env node
var fs = require('fs'),
  rollup = require('rollup'),
  uglify = require('uglify-js'),
  zlib = require('zlib'),
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
  ]

var parsed = rollup.rollup({
  entry: "j2c-math.js"
})


outputs.forEach(function (output) {
  // console.log(output)
  parsed.then(function (bundle) {
    var result = bundle.generate(output.rollupOptions);
    fs.writeFileSync('dist/j2c-math.'  + output.name + '.js', result.code);
    // if (output.minify) {
    //   var minified = uglify.minify(
    //     result.code, 
    //     {
    //       fromString: true,
    //       comments: true
    //     }
    //   ).code;

    //   fs.writeFileSync('dist/j2c-math.'  + output.name + '.min.js', minified);
    //   zlib.gzip(minified, function(_, buf){ 
    //     console.log(output.name, _ || buf.length);
    //   });
    // }
  }).then(null, function (e) { console.log(output.name, e)});
});

