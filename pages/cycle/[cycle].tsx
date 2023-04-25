import { GetServerSideProps } from 'next'

import { getCycle } from '../../firebase/firestore'
import Cycle from '../../interfaces/Cycle'

export default function CyclePage({ cycle }: { cycle: Cycle | null }) {
  if (!cycle) {
    return null
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
    </div>
  )
}
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const cycle = await getCycle(params?.cycle?.toString())
  return {
    props: { cycle },
  }
}
