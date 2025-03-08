const express = require('express');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer for file uploads
const upload = multer({
  dest: uploadDir, // Save uploaded files to the 'uploads' folder
  limits: { fileSize: 50 * 1024 * 1024 }, // Set file size limit to 50MB
  fileFilter: (req, file, cb) => {
    // Validate file type (allow only audio files)
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed!'), false);
    }
  },
});

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

if (!HUGGINGFACE_API_KEY) {
  console.error('Missing Hugging Face API Key. Please set HUGGINGFACE_API_KEY in your .env');
  process.exit(1);
}

/**
 * Transcribe audio using Hugging Face's Whisper model
 */
async function transcribeAudio(filePath) {
  try {
    console.log('Reading audio file:', filePath);
    const audioData = fs.readFileSync(filePath, { encoding: 'base64' });

    console.log('Sending request to Hugging Face API...');
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/openai/whisper-small',
      { inputs: audioData },
      { headers: { Authorization: `Bearer ${HUGGINGFACE_API_KEY}` } }
    );

    console.log('Hugging Face API response:', response.data);
    return response.data.text;
  } catch (error) {
    console.error('Error transcribing audio:', error.response?.data || error.message);
    throw new Error('Failed to transcribe audio');
  }
}

/**
 * Detect emotions from text using Hugging Face's emotion classification model
 */
async function detectEmotions(text) {
  try {
    console.log('Sending request to Hugging Face emotion detection API...');
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/MilaNLProc/xlm-emo-t',
      { inputs: text },
      { headers: { Authorization: `Bearer ${HUGGINGFACE_API_KEY}` } }
    );

    const emotions = {};
    response.data[0].forEach((emotion) => {
      emotions[emotion.label] = emotion.score;
    });

    return emotions;
  } catch (error) {
    console.error('Error detecting emotions:', error.response?.data || error.message);

    // Fallback: Return a default response if the API is unavailable
    return {
      anger: 0,
      joy: 0,
      sadness: 0,
      fear: 0,
    };
  }
}

/**
 * API endpoint for uploading audio file, transcribing, and detecting emotions
 */
app.post('/transcribe-and-detect-emotions', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file uploaded' });
    }

    const filePath = req.file.path;

    // Step 1: Transcribe the audio
    const transcription = await transcribeAudio(filePath);

    // Step 2: Detect emotions from the transcription
    const emotions = await detectEmotions(transcription);

    // Clean up the uploaded file
    fs.unlinkSync(filePath);

    // Return the results
    res.json({ transcription, emotions });
  } catch (error) {
    console.error('Error in API:', error.message);
    res.status(500).json({ error: 'Failed to process audio' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});