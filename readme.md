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
npm install canvas
```

More information can be found [here](https://cloud.google.com/vision/docs/face-tutorial).

## Instruction on how to run

All the tutorials below can be found in [scripts](https://github.com/Aleadinglight/Google-cloud-vision-api/tree/master/scripts) folder. You can run command from the master folder

```bash
# You should export the GGOOGLE_APPLICATION_CREDENTIALS where you want to run the scripts from
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

## Tutorials

1.[Example.js](https://github.com/Aleadinglight/Google-cloud-vision-api/tree/master/scripts/example.js): Example on how to use the API to label a human picture.

<img src="https://github.com/Aleadinglight/Google-cloud-vision-api/blob/master/output_images/trump.png" width="256">

