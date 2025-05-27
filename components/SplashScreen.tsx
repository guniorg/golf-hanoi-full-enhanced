'use client'
import React from 'react'

export default function SplashScreen() {
  return (
    <div
      className="flex items-center justify-center h-screen w-screen flex-col animate-fadeout"
      style={{
        background: 'linear-gradient(to bottom, #3b82f6, #1e40af)',
        color: 'white', // 텍스트 흰색
        textAlign: 'center'
      }}
    >
      <h1 className="text-5xl font-extrabold mb-4">⛳ Hanoi Golf Reservation</h1>
      <p className="text-2xl font-medium">이보다 더 쉬울 수 없는 하노이 골프장 예약</p>
    </div>
  )
}









