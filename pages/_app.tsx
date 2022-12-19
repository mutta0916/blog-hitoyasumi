import '../styles/globals.css'
import type { AppProps } from 'next/app'
import localFont from '@next/font/local'

const font = localFont({ src : './font/hanazome.ttf'})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={ font.className }>
      <Component {...pageProps}/>
    </div>
  )
}
