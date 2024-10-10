// src/app/page.tsx (eller motsvarande)
"use client"; // Markera som Client Component

import Navbar from '@/components/Navbar';
import AIInteraction from '@/components/AIInteraction';

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <Navbar />
      <h2 className="text-2xl font-bold mt-8">Välkommen till SpeechAI</h2>
      <p className="text-lg mt-4">Analysera tal i realtid med AI-teknologi!</p>
      <AIInteraction />
    </div>
  );
}
