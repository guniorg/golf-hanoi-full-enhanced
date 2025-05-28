'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SplashScreen() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()
  const [started, setStarted] = useState(false)

  const handleStart = () => {
    setStarted(true) // 먼저 시작 상태를 true로 바꾸고
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = false
        videoRef.current.volume = 1.0
        videoRef.current.play()
      }
    }, 100) // 렌더링 후 재생을 약간 지연시켜 안전하게 실행
  }

  useEffect(() => {
    if (!videoRef.current) return

    const handleEnded = () => {
      router.push('/') // 영상이 끝나면 메인 화면으로 이동
    }

    const video = videoRef.current
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('ended', handleEnded)
    }
  }, [router])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {started && (
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/intro.mp4"
          playsInline
        />
      )}

      {!started && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20 bg-black">
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


























