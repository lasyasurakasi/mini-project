import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getAuth, User } from 'firebase/auth'

import { onAuthStateChanged } from '@firebase/auth'

import { logOut, signInGoogle } from '../../firebase/auth'
import Button from '../atoms/Button'
import Container from '../atoms/Container'
import Wrapper from '../atoms/Wrapper'

const auth = getAuth()
export default function Header() {
  const router = useRouter()
  const currentPath = router.pathname
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(false)
  const ROUTES = [
    {
      title: 'Home',
      slug: '/',
    },
  ]
  if (user)
    ROUTES.push({
      title: 'Rent Cycle',
      slug: '/rent',
    })
  useEffect(() => {
    onAuthStateChanged(auth, (_user) => {
      if (!_user) setUser(undefined)
      if (_user?.email?.endsWith('@iiitl.ac.in')) {
        setUser(_user)
      }
    })
  }, [])
  return (
    <Wrapper className={'sticky top-0 z-40 bg-p2 shadow-md'}>
      <Container className={'relative flex w-full items-center gap-8 py-5 px-2'}>
        {!loading && user && (
          <div
            className={
              'absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xl font-medium'
            }
          >
            Welcome {user?.displayName}!
          </div>
        )}
        <div className={'h-5 w-5 bg-black'} />
        <div className={'flex flex-grow justify-end gap-5'}>
          {ROUTES.map((route) => (
            <Link
              className={currentPath === route.slug ? 'font-bold text-p1 ' : ''}
              key={route.slug}
              href={route.slug}
            >
              {route.title}
            </Link>
          ))}
        </div>
        <Button
          width={150}
          height={50}
          id={'google'}
          variant={'outline'}
          className={
            'flex gap-3 rounded-lg border bg-white p-4 shadow-md transition-transform duration-200 ease-in-out hover:scale-105'
          }
          onClick={() => {
            setLoading(true)
            if (!user) signInGoogle().finally(() => setLoading(false))
            else router.push('/account')
          }}
        >
          {loading && (
            <div
              className="text-success inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-p1 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          )}
          {!loading && user && <span>Account</span>}
          {!loading && !user && 'Start Now'}
          {!loading && !user && (
            <img width={20} src="https://img.icons8.com/color/48/null/google-logo.png" />
          )}
        </Button>
      </Container>
    </Wrapper>
  )
}
