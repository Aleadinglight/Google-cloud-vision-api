// Using strict mode
"use strict";

const vision = require('@google-cloud/vision');
const fs = require('fs');
var client = new vision.ImageAnnotatorClient();

function detectLandmarks(fileName) {
    // [START vision_landmark_detection]
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
  
    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */
    // const fileName = 'Local image file, e.g. /path/to/image.png';
  
    // Performs landmark detection on the local file
    client
      .landmarkDetection(fileName)
      .then(results => {
        const landmarks = results[0].landmarkAnnotations;
        console.log('Landmarks:');
        landmarks.forEach(landmark => console.log(landmark));
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
    // [END vision_landmark_detection]
  }
  