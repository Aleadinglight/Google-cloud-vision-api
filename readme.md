# Google Cloud Vision API

Since the document from Google is only plain words without many illustrated result pictures, I wrote some tutorials on how to Google Cloud API with Node.js for better understanding.

## Requirements:
1. [Node.js](https://nodejs.org/en/download/) installed.

2. Install Google Cloud API.
```bash
npm init
npm install --save @google-cloud/vision
```

3. Get your Google Cloud account.

4. You will need to activate your [billing account](https://console.developers.google.com/billing.). 

5. Go to [your Google Cloud Account](https://console.cloud.google.com) and log in. Navigate to `APIs & Services`. Click on `Create credentials` -> `Service account key` -> Choose `JSON` format and fill in needed information. Your `.json` credetial file will be automaticly downloaded. 

6. Set the environment variable GOOGLE_APPLICATION_CREDENTIALS to the file path of the `.json` file that contains your service account key. 
```bash
export GOOGLE_APPLICATION_CREDENTIALS="[PATH]"
```

7. For drawing bounding box we will use he the [node-canvas](https://github.com/Automattic/node-canvas#installation) library.
```bash
# Install dependencies
sudo apt-get install libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++
npm install canvas@next
```

More information can be found [here](https://cloud.google.com/vision/docs/face-tutorial).

## Instruction on how to run

All the tutorials below can be found in [scripts](https://github.com/Aleadinglight/Google-cloud-vision-api/tree/master/scripts) folder. You can run this command from the master folder

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

<img src="https://github.com/Aleadinglight/Google-cloud-vision-api/blob/master/images/trump.jpg" width="320">

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

<img src="https://github.com/Aleadinglight/Google-cloud-vision-api/blob/master/output_images/me.png" width="320">

3.[Feeling detection](https://github.com/Aleadinglight/Google-cloud-vision-api/tree/master/scripts/feelingDetection.js): Detect faces and the specific feeling expressed on the faces. However, I found that this detection from Google is not really accurate. In most cases, we can still consider it acceptable.

<img src="https://github.com/Aleadinglight/Google-cloud-vision-api/blob/master/output_images/feelings.png" width="320">

4.[Other details detection](https://github.com/Aleadinglight/Google-cloud-vision-api/tree/master/scripts/otherFaceDetection.js): Detect the faces and other details, such as: headwear likelihood, blurred likelihood, detection confidence.

<img src="https://github.com/Aleadinglight/Google-cloud-vision-api/blob/master/output_images/putin.png" width="500">

5.[Landmark detection](https://github.com/Aleadinglight/Google-cloud-vision-api/tree/master/scripts/landmarkDetection.js): Detect face landmark and draw point on pictures.

<img src="https://github.com/Aleadinglight/Google-cloud-vision-api/blob/master/output_images/landmark.png" width="400">

If you want to take a look at the detail about the landmark point, you can go to line 50 and uncomment these lines.

```javascript
/*
    context.font = 'bold 10px arial';
    context.textAlign = 'center';
    context.fillText(landmark.type,pointX,pointY);
*/
```

<img src="https://github.com/Aleadinglight/Google-cloud-vision-api/blob/master/output_images/landmark_detail.png" width="400">

6.[Text detection](https://github.com/Aleadinglight/Google-cloud-vision-api/tree/master/scripts/textDetection.js): detect texts in a pictures and draw boxes over them. The return result from Google includes the overall full text so remember to exclude that one when count. I showed it in the console instead.

<img src="https://github.com/Aleadinglight/Google-cloud-vision-api/blob/master/output_images/text_detection_console.png" width="200">

The other texts is highlighted:

<img src="https://github.com/Aleadinglight/Google-cloud-vision-api/blob/master/output_images/text2.png" width="400">


