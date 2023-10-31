const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: 'AKIA45RXRSKRFVCGB4T5',
  secretAccessKey: '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',
  region: 'us-east-2',
});

const rekognition = new AWS.Rekognition();

// Assuming you have access to the user's uploaded video file and its name
const userUploadedVideo = {
  name: 'dynamic-video-name.mp4', // The user's uploaded video file name
  // Add other properties for the video file, e.g., path, buffer, etc.
};

const params = {
  Video: {
    S3Object: {
      Bucket: "lola-store",
      Name: userUploadedVideo.name, // Use the user's uploaded video file name
    },
  },
};

rekognition.startLabelDetection(params, (err, data) => {
  if (err) {
    console.error('Error analyzing video:', err);
  } else {
    console.log('Analysis started:', data.JobId);
    // Poll the job status and retrieve results when analysis is complete
  }
});