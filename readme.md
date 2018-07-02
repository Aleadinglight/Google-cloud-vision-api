# Google Cloud Vision API

Using Google Cloud API with Node.js

## Requirements:

More information [here](https://cloud.google.com/vision/docs/face-tutorial).

Run 
```
npm init
npm install --save @google-cloud/vision
```

<<<<<<< HEAD
Go to https://console.cloud.google.com and log in. Navigate to `APIs & Services`. Click on `Create credentials` -> `Service account key` -> Choose `JSON` format and fill in needed information. Your `.json` credetial file will be automaticly downloaded. 

Download credentials file and add set the environment variable GOOGLE_APPLICATION_CREDENTIALS to the file path of the JSON file that contains your service account key. 
```
export GOOGLE_APPLICATION_CREDENTIALS="[PATH]"
```

 
