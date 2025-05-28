'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashScreen() {
  const [started, setStarted] = useState(false);
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStart = () => {
    setStarted(true);
    const video = videoRef.current;
    if (video) {
      video.volume = 1;
      video.play();
    }

    // 영상 재생 6초 후 예약 페이지로 이동
    setTimeout(() => {
      router.push('/reservation');
    }, 6000);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {!started && (
        <button
          onClick={handleStart}
          className="absolute z-10 w-full h-full flex items-center justify-center bg-black"
        >
          <img
            src="/start-button.png"
            alt="화면을 누르면 시작합니다"
            className="max-w-[80%] h-auto object-contain"
          />
        </button>
      )}

      {started && (
        <video
          ref={videoRef}
          src="/intro.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          controls={false}
          muted={false}
          autoPlay={false}
        />
      )}
    </div>
  );
}



































