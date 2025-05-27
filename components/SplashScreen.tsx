'use client';
import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHide(true), 3500); // 3.5초 후 숨김
    return () => clearTimeout(timer);
  }, []);

  if (hide) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-blue-700 text-white text-center animate-fadeout">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">⛳ Hanoi Golf Reservation</h1>
      <p className="text-lg sm:text-xl font-medium">이보다 더 쉬울 수 없는<br />하노이 골프장 예약</p>
    </div>
  );
}






