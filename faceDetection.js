// Using strict mode
"use strict";

const vision = require('@google-cloud/vision');

var client = new vision.ImageAnnotatorClient();

function detectFaces(inputFile, callback){
    const request = {image: {source: {filename: inputFile}}}
    client
        .faceDetection(request)
        .then(results => {
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
    var inputFile = inputFile || './images/trump.jpg';
    detectFaces(inputFile, (err, faces) => {
        if (err){
            return callback(err);
        }
    })
}
main(console.log);