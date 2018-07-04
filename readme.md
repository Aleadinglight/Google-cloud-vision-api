# Google Cloud Vision API

Using Google Cloud API with Node.js

## Requirements:

Install Google Cloud API 
```bash
npm init
npm install --save @google-cloud/vision
```

You will need to activate your billing account here: https://console.developers.google.com/billing.

Go to https://console.cloud.google.com and log in. Navigate to `APIs & Services`. Click on `Create credentials` -> `Service account key` -> Choose `JSON` format and fill in needed information. Your `.json` credetial file will be automaticly downloaded. 

Set the environment variable GOOGLE_APPLICATION_CREDENTIALS to the file path of the `.json` file that contains your service account key. 
```bash
export GOOGLE_APPLICATION_CREDENTIALS="[PATH]"
```

For drawing bounding box we will use he the [node-canvas](https://github.com/Automattic/node-canvas#installation) library.
```bash
# Install dependencies
sudo apt-get install libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++
npm install canvas@next
```

More information can be found [here](https://cloud.google.com/vision/docs/face-tutorial).

## Instruction on how to run

All the tutorials below can be found in [scripts](https://github.com/Aleadinglight/Google-cloud-vision-api/tree/master/scripts) folder. You can run command from the master folder

```bash
# You should export the GOOGLE_APPLICATION_CREDENTIALS where you want to run the scripts from
node ./scripts/example.js
```

The following results
```
Labels:
senior citizen
person
official
chin
smile
elder
forehead
human
businesspers
```

If the tutorial output a picture. Please head to [output_images](https://github.com/Aleadinglight/Google-cloud-vision-api/tree/master/output_images) to see it.

It is also a great idea to read the [docs](https://cloud.google.com/vision/docs/reference/rest/v1/images/annotate#FaceAnnotation) from Google.

## Tutorials

1.[Example](https://github.com/Aleadinglight/Google-cloud-vision-api/tree/master/scripts/example.js): Example on how to use the API to label a human picture.

<img src="https://github.com/Aleadinglight/Google-cloud-vision-api/blob/master/images/trump.jpg" width="256">

Output:
```
Labels:
senior citizen
person
official
chin
smile
elder
forehead
human
businesspers
```

2.[Face detection](https://github.com/Aleadinglight/Google-cloud-vision-api/tree/master/scripts/faceDetection.js): Detect faces in a picture and draw a box to comfirm it.

<img src="https://github.com/Aleadinglight/Google-cloud-vision-api/blob/master/output_images/me.png" width="256">

3.[Feeling detection](https://github.com/Aleadinglight/Google-cloud-vision-api/tree/master/scripts/feelingDetection.js): Detect faces and the specific feeling expressed on the faces. However, I found that this detection from Google is not really accurate. In most cases, we can still consider it acceptable.

<img src="https://github.com/Aleadinglight/Google-cloud-vision-api/blob/master/output_images/feelings.png" width="256">

4.[Face angle detection]()

5.[Other details detection](https://github.com/Aleadinglight/Google-cloud-vision-api/tree/master/scripts/otherFaceDetection.js): Detect the faces and other details, such as: headwear likelihood, blurred likelihood, detection confidence.

<img src="https://github.com/Aleadinglight/Google-cloud-vision-api/blob/master/output_images/putin.png" width="256">