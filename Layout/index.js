import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Container, Icon } from 'semantic-ui-react'
import { Link, animateScroll as scroll } from 'react-scroll'

import { useData } from '../hooks/useData'
import { useMediaQueryJs } from '../hooks/useMediaQueryJs'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MenuRestaurants from '../components/Header/MenuRestaurants'
import OptionsMenu from '../components/Header/OptionsMenu'
import style from './Layout.module.css'

const Layout = ({ children }) => {
  const { data } = useData()
  const isOpen = data?.isOpen

  const [showMenuRestaurant, setShowMenuRestaurant] = useState(true)

  const router = useRouter()
  const pathname = router.pathname

  const { isAMobil } = useMediaQueryJs()

  useEffect(() => {
    if (
      pathname.includes('/plato/') ||
      pathname.includes('/carrito') ||
      pathname.includes('/cuenta')
    ) {
      setShowMenuRestaurant(false)
    } else {
      setShowMenuRestaurant(true)
    }
  }, [pathname])

  return (
    <Container fluid className='basic-layout' id='up'>
      <div className='dark' />
      <Header />
      <div className={style.menu}>
        {showMenuRestaurant && <MenuRestaurants />}
        {showMenuRestaurant && !isAMobil && <OptionsMenu />}
      </div>
      {!isOpen && isOpen !== null && (
        <div className='is-close'>
          <p>
            En estos momentos nos encontramos cerrados para realizar nuevos
            pedidos
          </p>
        </div>
      )}
      <Container className='content'>{children}</Container>
      <Link
        className={style.arrow}
        to='up'
        smooth={true}
        offset={0}
        duration={500}
      >
        <Icon name='arrow alternate circle up' />
      </Link>
      <Footer />
    </Container>
  )
}

export default Layout
