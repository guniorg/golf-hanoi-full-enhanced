'use client';
import { useState, useEffect } from 'react';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3500); // 3.5초 동안 표시

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="splash-bg animate-fadeout">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold flex items-center justify-center gap-2">
          <span>⛳</span>
          <span>Hanoi Golf Reservation</span>
        </h1>
        <p className="text-base sm:text-lg font-medium text-white">
          이보다 더 쉬울 수 없는<br />하노이 골프장 예약
        </p>
      </div>
    </div>
  );
}




