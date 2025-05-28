'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
      router.push('/') // 예약 페이지로 이동
    }, 5000) // 5초 동안 비디오 재생 후 이동

    return () => clearTimeout(timer)
  }, [router])

  if (!showSplash) return null

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <video
        className="absolute w-full h-full object-cover"
        autoPlay
        muted
        playsInline
      >
        <source src="/splash-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 flex items-center justify-center z-10 text-white text-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow">
            Hanoi Golf Reservation
          </h1>
          <p className="text-xl md:text-2xl drop-shadow">
            이보다 더 쉬울 수 없는 하노이 골프장 예약
          </p>
        </div>
      </div>
    </div>
  )
}


















