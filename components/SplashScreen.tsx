'use client'
import React from 'react'

export default function SplashScreen() {
  return (
    <div className="relative w-screen h-screen overflow-hidden animate-fadeout">
      {/* 배경 이미지 */}
      <img
        src="/splash-bg.jpg"
        alt="Splash Background"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* 텍스트 레이어 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">⛳ Hanoi Golf Reservation</h1>
        <p className="text-xl md:text-2xl drop-shadow-md">This is the easiest golf reservation in Hanoi</p>
      </div>
    </div>
  )
}














