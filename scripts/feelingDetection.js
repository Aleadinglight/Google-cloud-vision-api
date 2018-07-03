// Using strict mode
"use strict";

const vision = require('@google-cloud/vision');
const fs = require('fs');
const {createCanvas, Image } = require('canvas')

var client = new vision.ImageAnnotatorClient();

function feelingToNum(feel){
    switch (feel) {
        case "UNKNOWN":
            return 0;
        case "VERY_UNLIKELY":
            return 1;
        case "UNLIKELY":
            return 2;
        case "POSSIBLE":
            return 3;
        case "LIKELY":
            return 4;
        case "VERY_LIKELY":
            return 5;
    }
    return 0;
}

function getFeeling(face){
    var feelingArray = [
        {type:"joy", value:feelingToNum(face.joyLikelihood)},
        {type:"sorrow", value:feelingToNum(face.sorrowLikelihood)},
        {type:"anger", value:feelingToNum(face.angerLikelihood)},
        {type:"surprise", value:feelingToNum(face.surpriseLikelihood)}
    ]
    var maxx=0;
    var maxFeeling="undetected feeling"
    for (var i=0; i<feelingArray.length; i++){
        if (feelingArray[i].value>maxx){
            maxx = feelingArray[i].value;
            maxFeeling = feelingArray[i].type;
        }
    }
    return maxFeeling;
}

function highlightFaces(inputFile, outputFile, faces, callback) {
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

        // Now draw boxes around all the faces
        context.strokeStyle = 'rgba(0,255,0,0.8)';
        // Define color for text
        context.fillStyle = 'rgba(0,255,0,0.8)';
        context.lineWidth = '5';
    
        faces.forEach(face => {
            context.beginPath();
            let origX = 0;
            let origY = 0;
            face.fdBoundingPoly.vertices.forEach((bounds, i) => {
            if (i === 0) {
                origX = bounds.x;
                origY = bounds.y;
            }
            context.lineTo(bounds.x, bounds.y);
            });
            context.lineTo(origX, origY);
            context.stroke();
            
            // Show feeling
            context.font = '50px arial';
            var feeling = getFeeling(face);
            // 'origY-5' so the text wont get so close to the box
            context.fillText(feeling, origX, origY-5);
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
    var inputFile = './images/feelings.jpg';
    var outputFile = './output_images/feelings.png'
    // Detecting the faces
    detectFaces(inputFile, (err, faces) => {
        if (err){
            return callback(err);
        }
        callback('Dectecting finished.');
        // Highlighting the faces
        highlightFaces(inputFile, outputFile, faces, err =>{
            if (err) {
                return callback(err);
            }
            console.log('Highlighting finished!');
            
        });
    })

    
}
main(console.log);