import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'

import '../styles/globals.css'

// If loading a variable font, you don't need to specify the font weight
const roboto = Roboto({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['300', '400', '500', '700', '900'],
})
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={roboto.className}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
