const { createCanvas, Image } = require('canvas')
const fs = require('fs')
const canvas = createCanvas(200, 200)
const ctx = canvas.getContext('2d')

ctx.textAlign = 'center';
ctx.font = '10px arial';
ctx.fillText('hello', 10, 10);

var writeStream = fs.createWriteStream('text.png');
var pngStream = canvas.pngStream();

pngStream.on('data', chunk => {
    writeStream.write(chunk);
});
pngStream.on('error', console.log);
pngStream.on('end', console.log);