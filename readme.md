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
```
# Install dependencies
sudo apt-get install libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++

npm install canvas
```

More information can be found [here](https://cloud.google.com/vision/docs/face-tutorial).