import Link from 'next/link'

import Cycle from '../../interfaces/Cycle'
import CycleCard from '../molecules/CycleCard'

export default function Listing({ cycles }: { cycles: Cycle[] }) {
  return (
    <div>
      <div>Choose from the best cycles</div>
      <div className={'grid grid-cols-1 gap-5 px-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}>
        {cycles.map((cycle) => (
          <CycleCard cycle={cycle} key={cycle.id} />
        ))}
      </div>
    </div>
  )
}
