'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SplashScreen() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()
  const [started, setStarted] = useState(false)

  const handleStart = () => {
    if (videoRef.current) {
      videoRef.current.muted = false
      videoRef.current.volume = 1.0
      videoRef.current.play()
    }
    setStarted(true)
  }

  useEffect(() => {
    if (!videoRef.current) return

    const handleEnded = () => {
      router.push('/') // 예약 페이지로 이동
    }

    const video = videoRef.current
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('ended', handleEnded)
    }
  }, [router])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/intro.mp4"
        playsInline
        muted
      />
      
      {!started && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20 bg-black bg-opacity-60">
          <button
            onClick={handleStart}
            className="text-white text-xl font-bold bg-blue-600 px-8 py-4 rounded-xl shadow-lg hover:bg-blue-700 transition"
          >
            🔊 화면을 누르면 시작합니다
          </button>
        </div>
      )}
    </div>
  )
}

























