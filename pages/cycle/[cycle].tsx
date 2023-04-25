import { getCycle } from '../../firebase/firestore'
import Cycle from '../../interfaces/Cycle'

export default function CyclePage({ cycle }: { cycle: Cycle }) {
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
export async function getServerSideProps({ params }) {
  const cycle = await getCycle(params.cycle)
  return {
    props: { cycle },
  }
}
