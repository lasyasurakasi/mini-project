import type { NextPage } from 'next'

import HomeHero from '../components/organisms/HomeHero'
import HomeHowItWorks from '../components/organisms/HomeHowItWorks'
import Layout from '../components/organisms/Layout'
import Listing from '../components/organisms/Listing'
import { getCycles } from '../firebase/firestore'
import Cycle from '../interfaces/Cycle'

const Home: NextPage<{ cycles: Cycle[] }> = ({ cycles }) => {
  console.log(cycles)
  return (
    <Layout>
      <HomeHero />
      <Listing cycles={cycles} />
      <HomeHowItWorks />
    </Layout>
  )
}

export default Home

export async function getServerSideProps() {
  const cycles = await getCycles()
  return {
    props: {
      cycles: cycles.filter((c) => !c.paused),
    },
  }
}
