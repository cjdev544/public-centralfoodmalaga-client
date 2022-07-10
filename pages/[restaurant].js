import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useData } from '../hooks/useData'
import DefaultLoader from '../components/DefaultLoader'
import Seo from '../components/Seo'
import RestPage from '../components/RestPage'

const RestaurantPage = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const router = useRouter()
  const path = router.query.restaurant

  const { data } = useData()

  useEffect(() => {
    const restaurant = {
      sushiguay: 'Sushi Guay',
      guaywok: 'Guay Wok',
      'sabor-casita': 'Con Sabor a Casita',
      'hamburgueseria-venezuela': 'La Hamburguesería VZLA',
      'postres-bebidas': 'Postres y Bebidas',
    }
    const desc = {
      sushiguay:
        'Sushi Guay, restaurante de comida japonesa, sushi, maki, temaki, rolls tempura, rolls semitempura, ensaladas y platos combinados.',
      guaywok:
        'Guay Wok, restaourante de comida china, arroz, lumpia, pollo agridulce, chopsuey y platos combinados.',
      'sabor-casita':
        'Con Sabor a Casita, restaurante de comida latína, empanadas ,arepas, tostones playeros, cachapas, camperos y pabellon.',
      'hamburgueseria-venezuela':
        'Hamburguesería con el mejor sabor Venezolano, Hamburguesas, Perros calientes, Pepitos y Camperos',
      'postres-bebidas':
        'Postres y Bebidas, acompaña tu comida con la variedad de bebidas y postres que tenemos para ti.',
    }
    setTitle(restaurant[path] || 'Central Food')
    setDescription(
      desc[path] || 'Central Food, porque en la variedad esta el gusto. Comida venezolana en Málaga. Hamburguesas venezolana, comida china venezolana, sushi venezolano, comida casera venezolana'
    )
  }, [path])

  const products = data?.products?.filter(
    (product) => product.restaurante === path
  )

  if (!products) return <DefaultLoader />

  return (
    <>
      <Seo title={title} description={description} />
      <main>
        <RestPage products={products} path={path} />
      </main>
    </>
  )
}

export default RestaurantPage
