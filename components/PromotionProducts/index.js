import { useEffect, useState } from 'react'

import DefaultLoader from '../DefaultLoader'
import FindProducts from '../FindProducts'
import style from './PromotionProducts.module.css'

const PromotionProducts = ({ data }) => {
  const { homepage, products } = data

  const [promotionProducts, setPromotionProducts] = useState(null)
  const [loadProducts, setLoadProducts] = useState(null)

  useEffect(() => {
    if (homepage) {
      const dataPromo = homepage?.filter(
        (data) => data.id === 'promotionProducts'
      )[0]
      setPromotionProducts(dataPromo)
    }
  }, [homepage])

  useEffect(() => {
    if (promotionProducts?.productsSection?.length) {
      const productsInSection = promotionProducts?.productsSection.map(
        (productId) => {
          const res = products.filter(
            (productGlobal) => productGlobal.id === productId
          )
          return res[0]
        }
      )
      setLoadProducts(productsInSection)
    }
  }, [products, promotionProducts])

  if (!loadProducts) return <DefaultLoader />

  return (
    <section className={style.promotion}>
      <h2 className={style.title}>{promotionProducts?.title}</h2>
      <div className={style.text}>
        <p>{promotionProducts?.description}</p>
      </div>
      <FindProducts products={loadProducts} />
    </section>
  )
}

export default PromotionProducts
