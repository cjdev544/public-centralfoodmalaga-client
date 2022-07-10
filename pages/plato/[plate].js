import { useRouter } from 'next/router'

import { useData } from '../../hooks/useData'
import DefaultLoader from '../../components/DefaultLoader'
import Plate from '../../components/Plate'
import LeyComponent from '../../components/LeyComponent'
import Seo from '../../components/Seo'

const PlatePage = () => {
  const { query } = useRouter()
  const { data } = useData()

  const product = data?.products?.filter(
    (product) => product.path === query.plate
  )[0]

  if (!product) return <DefaultLoader />

  return (
    <>
      <Seo title={product?.nombre} description={product?.descripcion} />
      <main>
        <Plate product={product} />
        <LeyComponent />
      </main>
    </>
  )
}

export default PlatePage
