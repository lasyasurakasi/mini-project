import type { NextPage } from 'next'

import HomeHero from '../components/organisms/HomeHero'
import HomeHowItWorks from '../components/organisms/HomeHowItWorks'
import Layout from '../components/organisms/Layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <HomeHero />
      <HomeHowItWorks />
    </Layout>
  )
}

export default Home
