import '@/styles/global.css'
import React from 'react'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <React.StrictMode><Component {...pageProps} /></React.StrictMode>
}
