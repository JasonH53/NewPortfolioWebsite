'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Projects from '../components/Projects';
import Notes from '../components/Notes';

export default function Home() {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <main className="cli-theme">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="content">
        {activeTab === 'about' && <About />}
        {activeTab === 'projects' && <Projects />}
      </div>
    </main>
  );
}