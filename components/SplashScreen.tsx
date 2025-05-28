'use client'
import React from 'react'

export default function SplashScreen() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        playsInline
        loop
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 animate-fadeout">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Hanoi Golf Reservation</h1>
        <p className="text-xl drop-shadow-md">이보다 더 쉬울 수 없는 하노이 골프장 예약</p>
      </div>
    </div>
  )
}





















