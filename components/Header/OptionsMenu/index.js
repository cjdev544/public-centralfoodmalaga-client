import { useRouter } from 'next/router'
import { Container } from 'semantic-ui-react'
import { Link, animateScroll as scroll } from 'react-scroll'

import { useData } from '../../../hooks/useData'
import style from './OptionsMenu.module.css'
import { useEffect, useState } from 'react'

const OptionsMenu = () => {
  const router = useRouter()
  const path = router.query.restaurant
  const { data } = useData()

  const [restaurantCategories, setRestaurantCategories] = useState(null)

  const restaurantSelected = data?.restaurants?.filter(
    (restaurant) => restaurant.page === path
  )

  useEffect(() => {
    if (restaurantSelected) {
      setRestaurantCategories(restaurantSelected[0]?.categories)
    }
  }, [restaurantSelected])

  return (
    <div className={style.optionsMenu}>
      <Container className='options-menu__container'>
        {restaurantCategories?.map((optionProduct) => (
          <div className={style.optionsMenu__button} key={optionProduct}>
            <Link
              activeClass={style.active}
              to={optionProduct}
              spy={true}
              smooth={true}
              offset={-55}
              duration={500}
            >
              {optionProduct.includes('Todas') ? 'Hamburguesas' : optionProduct}
            </Link>
          </div>
        ))}
      </Container>
    </div>
  )
}

export default OptionsMenu
