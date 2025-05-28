'use client'
import React, { useEffect, useState } from 'react'

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3500)
    return () => clearTimeout(timer)
  }, [])

  if (!showSplash) return null

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <video
        autoPlay
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>      
    </div>
  )
}





















