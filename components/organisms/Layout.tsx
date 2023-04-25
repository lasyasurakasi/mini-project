import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { getAuth, User } from 'firebase/auth'

import { onAuthStateChanged } from '@firebase/auth'

import { getUser } from '../../firebase/firestore'
import UserInterface from '../../interfaces/User'

import Footer from './Footer'
import Header from './Header'

export default function Layout({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <main className={className}>
      <Header />
      <div>{children}</div>
      <Footer />
    </main>
  )
}
