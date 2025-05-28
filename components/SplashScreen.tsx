'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashScreen() {
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const router = useRouter();

  // 영상 재생이 끝나면 예약 페이지로 이동
  const handleVideoEnd = () => {
    router.push('/reservation');
  };

  // 버튼 클릭 시 intro.mp4 재생 시작
  const handleStartClick = () => {
    setStarted(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {!started ? (
        <button
          onClick={handleStartClick}
          className="absolute inset-0 flex items-center justify-center w-full h-full"
        >
          <img
            src="/start-button.png"
            alt="화면을 누르면 시작합니다"
            className="w-64 h-64 object-contain"
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































