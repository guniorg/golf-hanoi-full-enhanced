import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import SplashScreen from '../components/SplashScreen'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (showSplash) return <SplashScreen />

  return <Component {...pageProps} />
}






