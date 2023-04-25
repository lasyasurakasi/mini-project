import { useEffect, useState } from 'react'

import BookingCard from '../components/molecules/BookingCard'
import CycleCard from '../components/molecules/CycleCard'
import Layout from '../components/organisms/Layout'
import { signInGoogle } from '../firebase/auth'
import { getClientBookings, getCycles, getHostBookings, getUserCycles } from '../firebase/firestore'
import Booking from '../interfaces/Booking'
import Cycle from '../interfaces/Cycle'

import { useUser } from './_app'

export default function Account() {
  const { rawUser } = useUser()
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [bookingsByMe, setBookingsByMe] = useState<Booking[]>([])
  const [bookingsForMe, setBookingsForMe] = useState<Booking[]>([])
  useEffect(() => {
    if (rawUser === null) {
      signInGoogle()
    }
    if (rawUser) {
      getClientBookings(rawUser.email || '').then(setBookingsByMe)
      getHostBookings(rawUser.email || '').then(setBookingsForMe)
      getUserCycles(rawUser.email || '').then(setCycles)
    }
  }, [rawUser])
  const moneyEarned = bookingsForMe.reduce((acc, prev) => acc + (prev.price || 0), 0)
  const moneySpent = bookingsByMe.reduce((acc, prev) => acc + (prev.price || 0), 0)
  if (!rawUser) return null
  return (
    <Layout>
      <div>My Cycles</div>
      <div className={'flex'}>
        {cycles.map((cycle) => (
          <CycleCard cycle={cycle} key={cycle.id} />
        ))}
      </div>
      <div>Money Earned: {moneyEarned}</div>
      <div>Money Spent: {moneySpent}</div>
      <div>My Cycles Booked</div>
      <div className={'flex'}>
        {bookingsForMe.map((booking) => (
          <BookingCard booking={booking} key={booking.id} />
        ))}
      </div>
      <div>Cycles I Booked</div>
      <div className={'flex'}>
        {bookingsByMe.map((booking) => (
          <BookingCard booking={booking} key={booking.id} />
        ))}
      </div>
    </Layout>
  )
}
