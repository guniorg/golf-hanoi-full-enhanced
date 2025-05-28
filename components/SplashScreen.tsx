'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

export default function SplashScreen() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true)
    if (videoRef.current) {
      videoRef.current.play()
      videoRef.current.volume = 1.0
    }
  }

  const handleEnded = () => {
    router.push('/reserve')
  }

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
      {!clicked && (
        <button
          onClick={handleClick}
          className="z-10 text-white font-bold text-[7vw] md:text-[5vw] text-center px-4 py-2 rounded-xl bg-blue-600 shadow-lg animate-pulse"
        >
          🔊 화면을 누르면 시작합니다
        </button>
      )}
      <video
        ref={videoRef}
        src="/intro.mp4"
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
          clicked ? 'opacity-100' : 'opacity-0'
        }`}
        onEnded={handleEnded}
        playsInline
      />
    </div>
  )
}





























