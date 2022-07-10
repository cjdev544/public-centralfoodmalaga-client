import { useEffect, useState } from 'react'

import DefaultLoader from '../DefaultLoader'
import FindProducts from '../FindProducts'
import style from './PopularProducts.module.css'

const PopularProducts = ({ data }) => {
  const { homepage, products } = data

  const [popularProducts, setPopularProducts] = useState(null)
  const [loadProducts, setLoadProducts] = useState(null)

  useEffect(() => {
    if (homepage) {
      const dataPromo = homepage?.filter(
        (data) => data.id === 'popularProducts'
      )[0]
      setPopularProducts(dataPromo)
    }
  }, [homepage])

  useEffect(() => {
    if (popularProducts?.productsSection?.length) {
      const productsInSection = popularProducts?.productsSection.map(
        (productId) => {
          const res = products.filter(
            (productGlobal) => productGlobal.id === productId
          )
          return res[0]
        }
      )
      setLoadProducts(productsInSection)
    }
  }, [products, popularProducts])

  if (!loadProducts) return <DefaultLoader />

  return (
    <section className={style.promotion}>
      <h2 className={style.title}>{popularProducts?.title}</h2>
      <div className={style.text}>
        <p>{popularProducts?.description}</p>
      </div>
      <FindProducts products={loadProducts} />
    </section>
  )
}

export default PopularProducts
