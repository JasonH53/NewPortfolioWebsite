'use client';
import { useState } from 'react';
import About from '../components/About';

export default function Home() {
  return (
    <main className="cli-theme">
      <div className="content">
        <About />
      </div>
    </main>
  );
}