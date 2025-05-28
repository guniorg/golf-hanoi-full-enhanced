'use client'
import React, { useEffect, useState } from 'react'

export default function SplashScreen() {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 3500) // 3.5초 후 페이드아웃
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`fixed inset-0 z-50 ${fadeOut ? 'animate-fadeout' : ''}`}
    >
      {/* 비디오 배경 */}
      <video
        autoPlay
        muted
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source src="/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 오버레이 텍스트 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Hanoi Golf Reservation</h1>
        <p className="text-xl">이보다 더 쉬울 수 없는 하노이 골프장 예약</p>
      </div>

      {/* 반투명 배경 */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />
    </div>
  )
}




















