import SplashScreen from '../components/SplashScreen'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  if (showSplash) return <SplashScreen />

  return <Component {...pageProps} />
}




