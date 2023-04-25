import { GetServerSideProps } from 'next'
import { FieldValues, useForm } from 'react-hook-form'
import { v4 } from 'uuid'

import Button from '../../components/atoms/Button'
import Input from '../../components/atoms/Input'
import Layout from '../../components/organisms/Layout'
import { signInGoogle } from '../../firebase/auth'
import { getCycle } from '../../firebase/firestore'
import Booking from '../../interfaces/Booking'
import Cycle from '../../interfaces/Cycle'
import { useUser } from '../../pages/_app'
import getStripe from '../../stripe'
const SLOTS = [
  { code: '1', from: 6, to: 8, timeString: '6am - 8am', title: 'Slot 1' },
  { code: '2', from: 8, to: 10, timeString: '8am - 10am', title: 'Slot 2' },
  { code: '3', from: 10, to: 12, timeString: '10am - 12pm', title: 'Slot 3' },
  { code: '4', from: 12, to: 14, timeString: '12pm - 2pm', title: 'Slot 4' },
  { code: '5', from: 14, to: 16, timeString: '2pm - 4pm', title: 'Slot 5' },
  { code: '6', from: 16, to: 18, timeString: '4pm - 6pm', title: 'Slot 6' },
  { code: '7', from: 18, to: 20, timeString: '6pm - 8pm', title: 'Slot 7' },
  { code: '8', from: 20, to: 22, timeString: '8pm - 10pm', title: 'Slot 8' },
]
export default function CyclePage({ cycle }: { cycle: Cycle | null }) {
  const { register, handleSubmit } = useForm()
  const { rawUser } = useUser()
  if (!cycle) {
    return null
  }
  async function onSubmit(data: FieldValues) {
    const slot = SLOTS.find((slot) => slot.code === data.slot)
    if (!slot) return
    if (!cycle || !rawUser) {
      signInGoogle()
      return
    }
    const booking: Booking = {
      slot: slot.code,
      cycle: cycle.id,
      date: new Date().getTime(),
      client: rawUser?.email || '',
      host: cycle.host,
      id: v4(),
      price: cycle.price,
    }
    const response = await fetch('/api/stripe-checkout', {
      method: 'POST',
      body: JSON.stringify({
        plan: {
          name: 'Book ' + cycle?.title,
          description: `Book ${cycle?.title} for ${data.date} ${slot.timeString}`,
          price: cycle?.price * 100 || 0,
        },
        booking,
      }),
    }).then((data) => data.json())
    if (response.statusCode === 500) {
      console.error(response.message)
      return
    }

    // Redirect to Checkout.
    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id,
    })
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    if (error) alert(error.message)
  }
  return (
    <Layout className={'rounded-xl bg-white p-5 shadow'}>
      {cycle.title}
      {cycle.host}
      <ul>
        {cycle.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label={'Date'} type={'date'} register={register('date', { required: true })} />
        <Input
          label={'Select Slot'}
          options={SLOTS.map((slot) => ({ ...slot, title: slot.timeString }))}
          type={'select'}
          register={register('slot', { required: true })}
        />

        <Button id={'booking'} variant={'primary'}>
          Book
        </Button>
      </form>
    </Layout>
  )
}
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const cycle = await getCycle(params?.cycle?.toString())
  return {
    props: { cycle },
  }
}
