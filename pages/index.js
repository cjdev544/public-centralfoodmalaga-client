import PromotionProducts from '../components/PromotionProducts'
import DefaultLoader from '../components/DefaultLoader'

import Seo from '../components/Seo'
import { useData } from '../hooks/useData'
import PopularProducts from '../components/PopularProducts'

export default function Home() {
  const { data } = useData()

  if (!data?.homepage) return <DefaultLoader />

  return (
    <>
      <Seo title='Inicio' />
      <main>
        <PromotionProducts data={data} />
        <PopularProducts data={data} />
      </main>
    </>
  )
}
