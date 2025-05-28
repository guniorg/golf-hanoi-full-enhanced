'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function SplashScreen() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 3000) // 3초 후 예약 페이지로 이동
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/intro.mp4"
        autoPlay
        muted
        playsInline
      />
    </div>
  )
}






















