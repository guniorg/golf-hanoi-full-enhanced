'use client'
import React from 'react'

export default function SplashScreen() {
  return (
    <div
      className="flex items-center justify-center h-screen w-screen flex-col text-white text-center animate-fadeout"
      style={{
        backgroundImage: 'url("/splash-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-4">⛳ Hanoi Golf Reservation</h1>
      <p className="text-xl md:text-2xl">This is the easiest golf reservation in Hanoi</p>
    </div>
  )
}













