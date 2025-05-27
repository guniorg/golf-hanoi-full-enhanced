'use client'
import React from 'react'

export default function SplashScreen() {
  return (
    <div className="h-screen w-screen flex items-center justify-center animate-fadeout relative">
      <img
        src="/splash-bg.jpg"
        alt="Splash Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="z-10 text-white text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Hanoi Golf Reservation</h1>
        <p className="text-xl md:text-2xl">이보다 더 쉬울 수 없는 하노이 골프장 예약</p>
      </div>
    </div>
  )
}

















