import Head from 'next/head'
import { AppProps } from 'next/dist/shared/lib/router/router'
import { Noto_Sans } from 'next/font/google'

import 'styles/globals.scss'

const notoSans = Noto_Sans({
  weight: ['300', '400', '500', '600', '700'],
  style: 'normal',
  subsets: ['latin', 'cyrillic']
})

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>MyTop - наш лучший топ</title>
        <link
          rel='icon'
          href='/favicon.ico'
        />
        <meta
          property='og:url'
          content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}
        />
        <meta
          property='og:locale'
          content='ru_RU'
        />
      </Head>
      <style
        jsx
        global
      >{`
        html {
          font-family: ${notoSans.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
