import Link from 'next/link'

import Cycle from '../../interfaces/Cycle'

export default function Listing({ cycles }: { cycles: Cycle[] }) {
  return (
    <div>
      <div>Choose from the best cycles</div>
      <div className={'flex flex-wrap gap-5'}>
        {cycles.map((cycle) => (
          <Link
            key={cycle.id}
            href={'/cycle/' + cycle.id}
            className={'rounded-xl bg-white p-5 shadow'}
          >
            {cycle.title}
            {cycle.host}
            <ul>
              {cycle.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </div>
  )
}
