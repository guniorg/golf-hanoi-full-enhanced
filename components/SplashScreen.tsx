'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';

export default function SplashScreen() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    setStarted(true);
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.volume = 1.0;
    }
    setTimeout(() => {
      router.push('/reservation');
    }, 6000); // 6초 후 이동
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      {!started && (
        <button
          className="absolute z-10 text-4xl font-bold text-white bg-blue-600 px-8 py-4 rounded-lg shadow-lg"
          onClick={handleClick}
        >
          🔊 화면을 누르면 시작합니다
        </button>
      )}
      <video
        ref={videoRef}
        src="/intro.mp4"
        className="w-full h-full object-cover"
        muted={false}
        playsInline
      />
    </div>
  );
}











































