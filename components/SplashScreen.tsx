'use client'
import React from 'react'

export default function SplashScreen() {
  return (
    <div
      className="flex items-center justify-center h-screen w-screen flex-col text-white animate-fadeout"
      style={{
        background: 'linear-gradient(to bottom, #3b82f6, #1e40af)' // blue-500 to blue-800
      }}
    >
      <h1 className="text-4xl font-bold mb-2">⛳ Hanoi Golf Reservation</h1>
      <p className="text-lg">이보다 더 쉬울 수 없는 하노이 골프장 예약</p>
    </div>
  )
}








