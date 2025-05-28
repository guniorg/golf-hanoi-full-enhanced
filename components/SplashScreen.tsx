'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SplashScreen() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()
  const [started, setStarted] = useState(false)

  const handleStart = () => {
    setStarted(true)
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = false
        videoRef.current.volume = 1.0
        videoRef.current.play()
      }
    }, 100)
  }

  useEffect(() => {
    if (!videoRef.current) return

    const handleEnded = () => {
      router.push('/') // 영상이 끝나면 홈으로 이동
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
          <button onClick={handleStart} className="focus:outline-none">
            <img
              src="/start-button.png" // public 폴더에 위치해야 함
              alt="화면을 누르면 시작합니다"
              className="w-3/5 max-w-xs sm:w-2/5 md:w-1/4 lg:w-1/5"
            />
          </button>
        </div>
      )}
    </div>
  )
}



























