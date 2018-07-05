// Using strict mode
"use strict";

const vision = require('@google-cloud/vision');
const fs = require('fs');
const {createCanvas, Image } = require('canvas')

var client = new vision.ImageAnnotatorClient();
function highlightText(inputFile, outputFile, texts, callback) {
    fs.readFile(inputFile, (err, image) => {
      if (err) {
        return callback(err);
      }
      // Open the original image into a canvas
      var img = new Image;
      img.src = image;
      var canvas = createCanvas(img.width, img.height);
      var context = canvas.getContext('2d');
      context.drawImage(img, 0, 0, img.width, img.height);
  
      // Now draw boxes around all the texts
      context.strokeStyle = 'rgba(0, 0, 255, 0.8)';
      context.lineWidth = '3';
      context.fillStyle = 'rgba(0, 0, 255, 0.8)';

      texts.forEach((text, i) => {
        if (i === 0){
            console.log('\nText result: "'+ text.description +'"');
        }
        else{
            context.beginPath();
            let origX = 0;
            let origY = 0;
            text.boundingPoly.vertices.forEach((bounds, j) => {
            if (j === 0) {
                origX = bounds.x;
                origY = bounds.y;
            }
            context.lineTo(bounds.x, bounds.y);
            });
            context.lineTo(origX, origY);
            context.stroke();
        }
    });
      
  
      // Write the result to a file
      console.log('Writing to file ' + outputFile);
      var writeStream = fs.createWriteStream(outputFile);
      var pngStream = canvas.pngStream();
  
      pngStream.on('data', chunk => {
        writeStream.write(chunk);
      });
      pngStream.on('error', console.log);
      pngStream.on('end', callback);
    });
  }

// Send request
function detectText(inputFile, callback){
    const request = {image: {source: {filename: inputFile}}}
    client
    // This line send the type of the request
        .textDetection(request)
        .then(results => {
            // Results is an object, more can be found in the document
            const texts = results[0].textAnnotations;
            var numTexts = Math.max(texts.length-1,0);
            console.log('Found ' + numTexts + (numTexts === 1 ? ' text' : ' texts'));
            callback(null, texts);
        })
        .catch(err => {
            console.error('ERROR:',err);
            callback(err);
        });
}

function main(callback){
    callback('Running...');
    var inputFile = './images/text2.jpg';
    var outputFile = './output_images/text2.png'
    // Detecting the faces
    detectText(inputFile, (err, texts) => {
        if (err){
            return callback(err);
        }
        callback('Dectecting finished.');

       // Highlighting the faces
        highlightText(inputFile, outputFile, texts, err =>{
            if (err) {
                return callback(err);
            }
            console.log('Highlighting finished!');
        });
    })
    
}
main(console.log);