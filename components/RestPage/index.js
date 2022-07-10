import { useEffect, useState } from 'react'

import { useData } from '../../hooks/useData'
import DefaultLoader from '../DefaultLoader'
import SectionPlates from '../SectionPlates'
import style from './RestPage.module.css'

const RestPage = ({ products, path }) => {
  const { data } = useData()

  const [restaurantCategories, setRestaurantCategories] = useState(null)

  const pageRest = {
    sushiguay: 'Sushi Guay',
    guaywok: 'Guay Wok',
    'sabor-casita': 'Con Sabor a Casita',
    'hamburgueseria-venezuela': 'La Hamburguesería VZLA',
    bebidas: 'Bebidas',
  }

  const restaurant = pageRest[path]

  const restaurantSelected = data?.restaurants?.filter(
    (restaurant) => restaurant.page === path
  )

  useEffect(() => {
    if (restaurantSelected) {
      setRestaurantCategories(restaurantSelected[0]?.categories)
    }
  }, [restaurantSelected])

  if (!products) return <DefaultLoader />

  return (
    <div className='rest-page'>
      <h2 className={style.title}>{restaurant}</h2>
      {restaurantCategories?.map((category) => (
        <section className='rest-page__option' key={category} id={category}>
          <h3 className={style.optionTitle}>{category}</h3>
          <SectionPlates products={products} category={category} />
        </section>
      ))}
    </div>
  )
}

export default RestPage
