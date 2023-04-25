import Link from 'next/link'

import Cycle from '../../interfaces/Cycle'
import CycleCard from '../molecules/CycleCard'

export default function Listing({ cycles }: { cycles: Cycle[] }) {
  return (
    <div>
      <div>Choose from the best cycles</div>
      <div className={'flex flex-wrap gap-5'}>
        {cycles.map((cycle) => (
          <CycleCard cycle={cycle} key={cycle.id} />
        ))}
      </div>
    </div>
  )
}
