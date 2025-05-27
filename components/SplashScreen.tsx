'use client';
import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3500); // 3.5초로 지연
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-white bg-gradient-to-b from-blue-500 to-blue-800 animate-fadeout">
      <h1 className="text-3xl font-bold flex items-center">
        <span className="mr-2 text-4xl">⛳</span> Hanoi Golf Reservation
      </h1>
      <p className="mt-4 text-lg font-medium text-center px-4">
        이보다 더 쉬울 수 없는<br /> 하노이 골프장 예약
      </p>
    </div>
  );
}





