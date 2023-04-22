import Link from 'next/link'

import Container from '../atoms/Container'
import Wrapper from '../atoms/Wrapper'
const ROUTES = [
  {
    title: 'Home',
    slug: '/',
  },
  {
    title: 'Listings',
    slug: '/listings',
  },
]
export default function Footer() {
  return (
    <Wrapper className={'bg-black'}>
      <Container className={'grid grid-cols-1 gap-8 py-10  px-2 text-white md:grid-cols-4'}>
        <div>
          <div>Logo</div>
          <div>Lorem Ipsum</div>
          <div className={'flex gap-4'}>
            <div
              className={
                'flex h-5 w-5 items-center justify-center rounded-full border border-white'
              }
            >
              f
            </div>
            <div
              className={
                'flex h-5 w-5 items-center justify-center rounded-full border border-white'
              }
            >
              f
            </div>
            <div
              className={
                'flex h-5 w-5 items-center justify-center rounded-full border border-white'
              }
            >
              f
            </div>
            <div
              className={
                'flex h-5 w-5 items-center justify-center rounded-full border border-white'
              }
            >
              f
            </div>
          </div>
        </div>
        <div className={'flex flex-col gap-5'}>
          <div>Our Locations</div>
          <div>
            <div>Big Pramind</div>
            <div>Small pyramid</div>
          </div>
          <div>
            <div>Big Pramind</div>
            <div>Small pyramid</div>
          </div>
          <div>
            <div>Big Pramind</div>
            <div>Small pyramid</div>
          </div>
          <div>
            <div>Big Pramind</div>
            <div>Small pyramid</div>
          </div>
        </div>
        <div className={'flex flex-col'}>
          <div>Pages</div>
          <div>
            {ROUTES.map((route) => (
              <div key={route.slug}>
                <Link href={route.slug}>{route.title}</Link>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div>Get in touch</div>
          <div>
            <div className={'flex gap-3'}>
              <div>f</div>
              <div>Face book address</div>
            </div>
            <div className={'flex gap-3'}>
              <div>f</div>
              <div>Face book address</div>
            </div>
            <div className={'flex gap-3'}>
              <div>f</div>
              <div>Face book address</div>
            </div>
            <div className={'flex gap-3'}>
              <div>f</div>
              <div>Face book address</div>
            </div>
          </div>
        </div>
      </Container>
    </Wrapper>
  )
}
