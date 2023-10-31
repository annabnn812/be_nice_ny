const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Import route files
const uploadVideoRoute = require('./upload-video');

app.use(bodyParser.json());

// Use your routes
app.use('/api', uploadVideoRoute);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
