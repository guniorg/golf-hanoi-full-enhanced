'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';

export default function SplashScreen() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
    if (videoRef.current) {
      videoRef.current.volume = 1.0;
      videoRef.current.play();
    }
    setTimeout(() => {
      router.push('/reservation');
    }, 6000); // 6초 후 이동
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
      {!started && (
        <button
          onClick={handleStart}
          className="absolute z-10 w-64 h-64"
        >
          <img
            src="/start-button.png"
            alt="Start Button"
            className="w-full h-full object-contain"
          />
        </button>
      )}

      <video
        ref={videoRef}
        src="/intro.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover"
        muted
        playsInline
      />
    </div>
  );
}




































