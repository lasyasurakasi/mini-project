import { useState } from 'react'
import Link from 'next/link'

import { updateCycle } from '../../firebase/firestore'
import Cycle from '../../interfaces/Cycle'
import { useUser } from '../../pages/_app'
import Button from '../atoms/Button'

export default function CycleCard({ cycle }: { cycle: Cycle }) {
  const [paused, setPaused] = useState(cycle.paused)
  const [loading, setLoading] = useState(false)
  const { rawUser } = useUser()
  const isOwner = rawUser?.email === cycle.host
  function togglePause() {
    setLoading(true)
    updateCycle(cycle.id, { paused: !paused })
      .then(() => setPaused(!paused))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false))
  }
  return (
    <div className={'rounded-xl bg-white p-5 shadow'}>
      {cycle.title}
      {cycle.host}

      <ul>
        {cycle.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      {isOwner && (
        <Button
          width={90}
          height={40}
          disabled={loading}
          onClick={togglePause}
          variant={'primary'}
          id={'pause'}
        >
          {loading && 'Loading'}
          {!loading && (paused ? 'Paused' : 'Pause')}
        </Button>
      )}
      {isOwner && (
        <Link href={'/edit/' + cycle.id}>
          <Button width={90} height={40} variant={'primary'} id={'pause'}>
            Edit
          </Button>
        </Link>
      )}
      <Link href={'/cycle/' + cycle.id}>Read More</Link>
    </div>
  )
}
