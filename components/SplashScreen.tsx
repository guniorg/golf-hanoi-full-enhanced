'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

export default function SplashScreen() {
  const [started, setStarted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

  const handleStart = () => {
    setStarted(true)
    const video = videoRef.current
    if (video) {
      video.volume = 1.0
      video.play()
    }
    // 6초 후 예약 페이지로 이동
    setTimeout(() => {
      router.push('/')
    }, 6000)
  }

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-black">
      {!started && (
        <button
          onClick={handleStart}
          className="absolute z-10 w-[300px] h-auto"
        >
          <img
            src="/start-button.png"
            alt="Start Button"
            className="w-full h-auto"
          />
        </button>
      )}

      {started && (
        <video
          ref={videoRef}
          src="/intro.mp4"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          playsInline
        />
      )}
    </div>
  )
}






























