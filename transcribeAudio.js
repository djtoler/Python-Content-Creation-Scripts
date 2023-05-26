const fetch = require('cross-fetch');
const fs = require('fs');
require('dotenv').config();
const { parseStringPromise } = require('xml2js');

const connectionObject = { region: "us-east-1", aws_access_key_id: process.env.AWS_ACCESS_KEY_ID, aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY}
let transcriptURI;
let jsonTranscript;

const { TranscribeClient, StartTranscriptionJobCommand, GetTranscriptionJobCommand  } = require("@aws-sdk/client-transcribe");
const transcribeClient = new TranscribeClient(connectionObject);
const transcribeJobName = "test28";
const transcribeFilePath = "s3://transcribe4ae/jpaud.mp3";
const transcribeOutputBucketName = "transcribe4ae";
const transcribeLanguageCode = "en-US";
const transcribeParams = {
    TranscriptionJobName: transcribeJobName,
    LanguageCode: transcribeLanguageCode,
    Media: { MediaFileUri: transcribeFilePath },
    OutputBucketName: transcribeOutputBucketName,
  };

const { S3Client, PutObjectAclCommand } = require("@aws-sdk/client-s3");
const s3Client = new S3Client(connectionObject);
const S3Params = {Bucket: transcribeOutputBucketName, Key: transcribeJobName+'.json', ACL: 'public-read'};

const s3GrantPublicReadAccess = async () => {
    try {
        const giveFilePermissions = new PutObjectAclCommand(S3Params);
        console.log(giveFilePermissions, "give file perms");

        const filePermissionGranted = await s3Client.send(giveFilePermissions);
        console.log(`Public read access granted to file -->`);
    }
    catch(error) {
        console.log(`ACCESS NOT GRANTED -->`, error);
    }
}

const startTranscriptionJob = async () => {
  try {
    const data = await transcribeClient.send(
      new StartTranscriptionJobCommand(transcribeParams)
    );
    console.log("Success - put", data);
    await checkTranscriptionJobStatus();
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};

const downloadTranscriptionFile = async (transcriptURI) => {
    try {
        const response = await fetch(transcriptURI);
        jsonTranscript = await response.json(); // Parse the response as JSON

        const localFilePath = transcribeJobName + ".json"; // Replace with your desired local file path
        fs.writeFileSync(localFilePath, JSON.stringify(jsonTranscript, null, 2));
        console.log("Transcription file downloaded successfully.");
        console.log(jsonTranscript.results.items[0].start_time, jsonTranscript.results.items[0].end_time, jsonTranscript.results.items[0].alternatives[0].content);
        console.log(jsonTranscript.results.items[1].start_time, jsonTranscript.results.items[1].end_time, jsonTranscript.results.items[1].alternatives[0].content);
        console.log(jsonTranscript.results.items[2].start_time, jsonTranscript.results.items[2].end_time, jsonTranscript.results.items[2].alternatives[0].content);
    } catch (err) {
        console.log("Error downloading transcription file", err);
    }
};

const checkTranscriptionJobStatus = async () => {
  const getJobParams = { TranscriptionJobName: transcribeJobName };

  try {
    const data = await transcribeClient.send(
      new GetTranscriptionJobCommand(getJobParams)
    );

    const jobStatus = data.TranscriptionJob.TranscriptionJobStatus;

    if (jobStatus === "COMPLETED") {
      transcriptURI = data.TranscriptionJob.Transcript.TranscriptFileUri;
      console.log("Transcription job completed");
      console.log("Transcript URI:", transcriptURI);
      await s3GrantPublicReadAccess();
      await downloadTranscriptionFile(transcriptURI);
      await groupTranscriptionForCaptions();
    } else if (jobStatus === "FAILED") {
      console.log("Transcription job failed");
    } else {
      console.log("Transcription job still in progress");
      setTimeout(checkTranscriptionJobStatus, 5000); // Check status again after 5 seconds
    }
  } catch (err) {
    console.log("Error", err);
  }
};

startTranscriptionJob();

const groupTranscriptionForCaptions = async () => {
    const groupedTranscriptions = [];
    let temp = [];
    let latestArray;
    const arrayOfWordsAndTimes = jsonTranscript.results.items
    let interval = 3.99; 

    for (let i = 0; i < arrayOfWordsAndTimes.length; i++) {
        const currentWordAndTime = arrayOfWordsAndTimes[i];
        const startTime = parseFloat(currentWordAndTime.start_time);
        const endTime = parseFloat(currentWordAndTime.end_time);
        const word = currentWordAndTime.alternatives[0].content

        if (startTime && endTime) {
            if (endTime <= interval) {
                temp.push({startTime, endTime, word})
            }
            else{
                groupedTranscriptions.push(temp)
                let intervalBatchOfWords = temp.reduce(function(previousValue, currentValue) {
                    return previousValue + ' ' + currentValue.word;
                }, '').trim();

                latestArray = groupedTranscriptions[groupedTranscriptions.length -1]

                temp.push({intervalBatchOfWords:{
                    words:intervalBatchOfWords,
                    start: latestArray[0].startTime,
                    end: latestArray[latestArray.length -1].endTime
                }})
                
                temp = [];
                interval += 3.99;
                console.log(groupedTranscriptions[groupedTranscriptions.length -1]);
            }
        }  
    }
    return groupedTranscriptions
};


  
