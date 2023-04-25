import Link from 'next/link'

import Booking from '../../interfaces/Booking'
import Cycle from '../../interfaces/Cycle'

export default function BookingCard({ booking }: { booking: Booking }) {
  return (
    <Link href={'/cycle/' + booking.cycle} className={'rounded-xl bg-white p-5 shadow'}>
      {booking.date}
      {booking.slot}
      {booking.client}
    </Link>
  )
}
