'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/router';

export default function SplashScreen() {
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const handleStart = () => {
    setStarted(true);

    // 재생 시작
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // 성공적으로 재생됨
          })
          .catch((error) => {
            console.error('자동 재생 실패:', error);
          });
      }
    }
  };

  const handleVideoEnd = () => {
    router.push('/reservation');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      {!started ? (
        <button onClick={handleStart} className="start-button-animation">
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
          onEnded={handleVideoEnd}
          autoPlay
          playsInline
          muted={false}
          controls={false}
        />
      )}
    </div>
  );
}













































