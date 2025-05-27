'use client'
import React from 'react'

export default function SplashScreen() {
  return (
    <div className="w-screen h-screen overflow-hidden animate-fadeout">
      <img
        src="/splash-bg.jpg" // 또는 splash-bg.png 등 확장자에 따라 변경
        alt="Splash Background"
        className="w-full h-full object-cover object-center"
      />
    </div>
  )
}















