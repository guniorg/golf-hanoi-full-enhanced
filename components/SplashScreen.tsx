'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashScreen() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const handleStartClick = () => {
    setHasStarted(true);
    setIsVideoVisible(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.volume = 1;
        videoRef.current.play();
      }
    }, 100); // 짧은 지연 후 재생
  };

  const handleVideoEnded = () => {
    router.push('/reservation');
  };

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden relative">
      {!hasStarted && (
        <button
          onClick={handleStartClick}
          className="absolute inset-0 w-full h-full z-10 flex items-center justify-center"
        >
          <img
            src="/start-button.png"
            alt="화면을 누르면 시작합니다"
            className="max-w-[80%] h-auto object-contain"
          />
        </button>
      )}

      {isVideoVisible && (
        <video
          ref={videoRef}
          src="/intro.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          onEnded={handleVideoEnded}
          playsInline
          muted={false}
          controls={false}
          autoPlay={false} // 강제 자동 재생 안 함
        />
      )}
    </div>
  );
}


































