'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/router';

export default function SplashScreen() {
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const handleStart = () => {
    setStarted(true);

    if (videoRef.current) {
      videoRef.current.volume = 1;
      videoRef.current.play();
    }

    setTimeout(() => {
      router.push('/reservation');
    }, 6000); // 6초 후 이동, 클릭 시에만
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black">
      {!started && (
        <button onClick={handleStart} className="z-10 absolute">
          <img
            src="/start-button.png"
            alt="화면을 누르면 시작합니다"
            className="w-64 h-auto mx-auto"
          />
        </button>
      )}

      {started && (
        <video
          ref={videoRef}
          className="absolute w-full h-full object-cover"
          src="/intro.mp4"
          muted={false}
          playsInline
        />
      )}
    </div>
  );
}









































