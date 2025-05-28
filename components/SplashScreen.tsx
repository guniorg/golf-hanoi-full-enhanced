'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';

export default function SplashScreen() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [started, setStarted] = useState(false);

  const handleStart = async () => {
    if (!videoRef.current) return;

    setStarted(true);
    try {
      videoRef.current.volume = 1.0;
      await videoRef.current.play();
    } catch (err) {
      console.error("Video play failed", err);
    }

    // 영상 재생이 끝나면 이동
    videoRef.current.onended = () => {
      router.push('/reservation');
    };
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
        playsInline
        controls={false}
      />
    </div>
  );
}





































