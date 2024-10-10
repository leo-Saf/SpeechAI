// pages/api/transcribe.js

import { SpeechClient } from '@google-cloud/speech';
import fs from 'fs';

const client = new SpeechClient({
  keyFilename: 'api/speechai-438211-5c1d2472c2c5.json',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { audioFilePath } = req.body; // Anta att du skickar filvägen i kroppen

    const file = fs.readFileSync(audioFilePath);
    const audioBytes = file.toString('base64');

    const request = {
      audio: {
        content: audioBytes,
      },
      config: {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'sv-SE',
      },
    };

    try {
      const [response] = await client.recognize(request);
      const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
      res.status(200).json({ transcription });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
