const AWS = require('aws-sdk');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const bucketName = process.env.AWS_S3_BUCKET_NAME;
let uploadCounter = 0;

app.use(bodyParser.json());

// Endpoint for video upload
app.post('/api/upload-video', upload.single('video'), async (req, res) => {
  const videoFile = req.file;

  if (!videoFile) {
    return res.status(400).json({ error: 'No video file provided' });
  }

  const params = {
    Bucket: bucketName,
    Key: `uploads/video-${Date.now()}.mp4`,
    Body: videoFile.buffer,
  };

  try {
    await s3.upload(params).promise();
    uploadCounter++;
    res.json({ message: 'Video uploaded successfully' });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get the upload count
app.get('/api/upload-count', (req, res) => {
  res.json({ uploadCount: uploadCounter });
});

const port = process.env.PORT || 41113;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
