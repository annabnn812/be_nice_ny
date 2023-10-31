const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const bucketName = process.env.AWS_S3_BUCKET_NAME;
let uploadCounter = 0;

// Endpoint for video upload
router.post('/upload-video', upload.single('video'), async (req, res) => {
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
router.get('/upload-count', (req, res) => {
  res.json({ uploadCount: uploadCounter });
});

module.exports = router;
