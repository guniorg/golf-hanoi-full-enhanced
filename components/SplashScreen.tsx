'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

export default function SplashScreen() {
  const [clicked, setClicked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const handleStart = () => {
    setClicked(true);

    // 영상 사운드 최대, 재생
    if (videoRef.current) {
      videoRef.current.volume = 1.0;
      videoRef.current.play();
    }

    // 6초 후 예약 페이지로 이동
    setTimeout(() => {
      router.push('/reservation');
    }, 6000);
  };

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center relative">
      {!clicked ? (
        <button onClick={handleStart} className="absolute inset-0 flex items-center justify-center">
          <img
            src="/start-button.png"
            alt="화면을 누르면 시작합니다"
            className="w-3/5 max-w-xs md:max-w-sm lg:max-w-md object-contain"
          />
        </button>
      ) : (
        <video
          ref={videoRef}
          src="/intro.mp4"
          className="w-full h-full object-cover"
          playsInline
        />
      )}
    </div>
  );
}












































