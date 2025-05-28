'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashScreen() {
  const [started, setStarted] = useState(false); // 처음엔 false
  const [videoEnded, setVideoEnded] = useState(false); // 영상 종료 확인
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const router = useRouter();

  // 시작 버튼 클릭 시
  const handleStartClick = () => {
    setStarted(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  // 영상이 끝났을 때만 이동
  const handleVideoEnd = () => {
    setVideoEnded(true);
    router.push('/reservation');
  };

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden relative">
      {!started && (
        <button
          onClick={handleStartClick}
          className="absolute inset-0 w-full h-full flex items-center justify-center z-10"
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

































