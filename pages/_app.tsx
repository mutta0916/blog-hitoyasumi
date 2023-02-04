import '../styles/globals.css'
import styles from '../styles/globals.module.css'
import type { AppProps } from 'next/app'
import { Kiwi_Maru } from '@next/font/google'
import Head from 'next/head'

const kiwiMaru = Kiwi_Maru({
  weight: '500',
  display: 'swap',
  subsets: ['japanese']
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={ kiwiMaru.className }>
      <Head>
        <title>喫茶 ひとやすみ</title>
        <meta name="description" content="エンジニアの雑多ブログです。仕事で詰まったところのメモが多めです。" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div className={ styles.container }>
        <main className={ styles.main }>
          <a href={ "/" }>
            <header className={ styles.title }>
              ひとやすみ
            </header>
          </a>
          <Component { ...pageProps }/>
        </main>
        <footer className={ styles.footer }>
          © 2022 yurika
        </footer>
      </div>
    </div>
  )
}
