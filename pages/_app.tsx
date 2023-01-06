import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Kiwi_Maru } from '@next/font/google'

const kiwiMaru = Kiwi_Maru({
  weight: '500',
  display: 'swap',
  subsets: ['japanese']
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={ kiwiMaru.className }>
      <Component {...pageProps}/>
    </div>
  )
}
