// src/app/page.tsx
'use client';

import MedicalFormOverlay from '../src/components/MedicalFormOverlay';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <MedicalFormOverlay />
    </main>
  );
}