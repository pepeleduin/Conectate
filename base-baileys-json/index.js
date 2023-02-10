const {Storage} = require('@google-cloud/storage');
const express = require("express");

const app = new express();


const storage = new Storage({
    keyFilename: "src/config.js",
 });

let bucketName = "chatbot"

const downloadFile = async() => {
    let destFilename = './downloadTest.txt';
    const options = {
      // The path to which the file should be downloaded, e.g. "./file.txt"
      destination: destFilename,
    };

    // Downloads the file
    await storage.bucket(bucketName).file(filename).download(options);

    console.log(
      `gs://${bucketName}/${filename} downloaded to ${destFilename}.`
    );
  } 

console.log(`${filename} uploaded to ${bucketName}.`);

downloadFile();

app.listen(process.env.PORT || 8088, () => { console.log('node server running');})