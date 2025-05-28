'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashScreen() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [started, setStarted] = useState(false); // 버튼 눌렀는지 여부
  const [videoVisible, setVideoVisible] = useState(false); // 비디오 표시 여부

  const handleStart = async () => {
    setStarted(true);
    setVideoVisible(true);

    try {
      if (videoRef.current) {
        videoRef.current.volume = 1.0;
        await videoRef.current.play();

        // 영상 실제 재생 시작 시점에 타이머 시작
        videoRef.current.onplaying = () => {
          setTimeout(() => {
            router.push('/reservation');
          }, 6000); // 정확히 6초 후 페이지 이동
        };
      }
    } catch (err) {
      console.error("Video play failed:", err);
    }
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
      {!started && (
        <button
          onClick={handleStart}
          className="absolute z-20 text-white text-3xl md:text-5xl font-bold bg-black bg-opacity-60 p-6 rounded-xl"
        >
          화면을 누르면 시작합니다
        </button>
      )}

      {videoVisible && (
        <video
          ref={videoRef}
          src="/intro.mp4"
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
          controls={false}
          playsInline
        />
      )}
    </div>
  );
}







































