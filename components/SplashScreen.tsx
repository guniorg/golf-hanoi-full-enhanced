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

      // 영상이 실제 재생되면 타이머 시작
      videoRef.current.onplaying = () => {
        setTimeout(() => {
          router.push('/reservation');
        }, 6000);
      };
    } catch (err) {
      console.error("Video play failed", err);
    }
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






































