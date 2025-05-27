'use client'
import React from 'react'

export default function SplashScreen() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 전체 배경 이미지 */}
      <img
        src="/splash-bg.jpg" // 또는 splash-bg.png, 실제 이미지명 확인
        alt="Splash Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 텍스트는 이미지 위에 중앙 정렬 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg">
          ⛳ Hanoi Golf Reservation
        </h1>
        <p className="text-xl sm:text-2xl mt-4 drop-shadow-md">
          이보다 더 쉬울 수 없는<br />하노이 골프장 예약
        </p>
      </div>
    </div>
  )
}
















