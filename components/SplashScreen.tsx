// components/SplashScreen.tsx

'use client';
import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        src="/intro.mp4"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Hanoi Golf Reservation</h1>
        <p className="text-xl sm:text-2xl">이보다 더 쉬울 수 없는 하노이 골프장 예약</p>
      </div>
    </div>
  );
}



















