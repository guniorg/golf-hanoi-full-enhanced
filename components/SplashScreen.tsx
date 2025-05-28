'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SplashScreen() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    if (clicked && videoRef.current) {
      videoRef.current.muted = false
      videoRef.current.volume = 1.0
      videoRef.current.play()
    }

    if (clicked) {
      const timer = setTimeout(() => {
        router.push('/') // 예약 페이지로 이동
      }, 3500)
      return () => clearTimeout(timer)
    }
  }, [clicked, router])

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-black"
      onClick={() => setClicked(true)}
    >
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/intro.mp4"
        autoPlay
        muted={!clicked}
        playsInline
      />
      {!clicked && (
        <div className="absolute top-0 left-0 w-full text-center text-white text-base font-semibold bg-black/40 py-2 z-10">
          🔊 화면을 눌러 사운드를 켜주세요
        </div>
      )}
    </div>
  )
}
























