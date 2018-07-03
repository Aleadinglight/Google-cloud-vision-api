// Using strict mode
"use strict";

const vision = require('@google-cloud/vision');
const fs = require('fs');
var client = new vision.ImageAnnotatorClient();

function showFeeling(inputFile, outputFile, faces, Canvas, callback) {
    fs.readFile(inputFile, (err, image) => {
      if (err) {
        return callback(err);
      }
  
      var Image = Canvas.Image;
      // Open the original image into a canvas
      var img = new Image();
      img.src = image;
      var canvas = new Canvas(img.width, img.height);
      var context = canvas.getContext('2d');
      context.drawImage(img, 0, 0, img.width, img.height);
  
      // Now draw boxes around all the faces
      context.strokeStyle = 'rgba(0,255,0,0.8)';
      context.lineWidth = '5';
  
      faces.forEach(face => {
        context.beginPath();
        let origX = 0;
        let origY = 0;
        face.boundingPoly.vertices.forEach((bounds, i) => {
          if (i === 0) {
            origX = bounds.x;
            origY = bounds.y;
          }
          context.lineTo(bounds.x, bounds.y);
        });
        context.lineTo(origX, origY);
        context.stroke();
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
function detectFaces(inputFile, callback){
    const request = {image: {source: {filename: inputFile}}}
    client
    // This line send the type of the request
        .faceDetection(request)
        .then(results => {
            // Results is an object, more can be found in the document
            const faces = results[0].faceAnnotations;
            var numFaces = faces.length;
            console.log('Found ' + numFaces + (numFaces === 1 ? ' face' : ' faces'));
            callback(null, faces);
        })
        .catch(err => {
            console.error('ERROR:',err);
            callback(err);
        });
}

function main(callback){
    callback('Running...');
    var inputFile = './images/trump.jpg';
    var outputFile = './output_images/trump.png'
    // Detecting the faces
    detectFaces(inputFile, (err, faces) => {
        if (err){
            return callback(err);
        }
        callback('Dectecting finished.');
        // Highlighting the faces
        highlightFaces(inputFile, outputFile, faces, require('canvas'), err =>{
            if (err) {
                return callback(err);
            }
            console.log('Highlighting finished!');
            callback(null, faces);
        });
    })

    
}
main(console.log);