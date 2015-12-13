var zlib = require('zlib'), fs = require('fs');

console.log('mingzipped sizes in bytes:');

['commonjs', 'global', 'amd'].forEach(function(kind){
    var source = fs.readFileSync('dist/j2c-math.' + kind + '.min.js');
    var size = zlib.gzipSync(source, {level: 9}).length
    console.log(kind, size);
})