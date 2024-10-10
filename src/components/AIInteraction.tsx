// src/components/AIInteraction.tsx
"use client"; // Markera som Client Component

import { useState, useEffect } from 'react';

const AIInteraction = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [transcription, setTranscription] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (mediaRecorder) {
      // Spara ljuddata i audioChunks
      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        setAudioChunks((prev) => [...prev, event.data]);
      };

      // När inspelningen stoppas, transkribera ljudet
      mediaRecorder.onstop = async () => {
        if (audioChunks.length > 0) {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const audioFile = new File([audioBlob], 'audio.wav', { type: 'audio/wav' });
          await transcribeAudio(audioFile);
          setAudioChunks([]); // Rensa audioChunks efter stopp
        }
      };
    }
  }, [mediaRecorder, audioChunks]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);
    setIsRecording(true);
    recorder.start();
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setIsRecording(false);
  };

  const transcribeAudio = async (audioFile: File) => {
    const formData = new FormData();
    formData.append('audioFile', audioFile);

    try {
      const res = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Något gick fel med transkriberingen.');
      }

      const data = await res.json();
      setTranscription(data.transcription || 'Ingen transkription hittades.');
    } catch (err) {
      const errorMessage = (err as Error).message || 'Något gick fel.';
      setError(errorMessage);
    }
  };

  return (
    <div className="mt-8">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`p-2 rounded ${isRecording ? 'bg-red-500' : 'bg-green-500'} text-white`}
      >
        {isRecording ? 'Stoppa inspelning' : 'Börja spela in'}
      </button>
      {transcription && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Transkription:</h3>
          <p>{transcription}</p>
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default AIInteraction;
