import Head from 'next/head'
import { AppProps } from 'next/dist/shared/lib/router/router'

import 'styles/globals.scss'

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
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
