import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container, Icon, Label, Menu } from 'semantic-ui-react'

import { useAuth } from '../../../hooks/useAuth'
import { useMediaQueryJs } from '../../../hooks/useMediaQueryJs'
import { useCart } from '../../../hooks/useCart'
import { useUi } from '../../../hooks/useUi'
import BasicModal from '../../modals/BasicModal'
import Auth from '../../Auth'
import style from './MenuBar.module.css'

const MenuBar = () => {
  const { showModal, setShowModal } = useUi()
  const [titleModal, setTitleModal] = useState('Iniciar sesión')

  const { authUser, logoutUser } = useAuth()
  const router = useRouter()
  const { productsInCart } = useCart()
  const { isLittleMobile } = useMediaQueryJs()
  const [numberCart, setNumberCart] = useState(productsInCart)

  useEffect(() => {
    setNumberCart(productsInCart)
  }, [productsInCart])

  const handleLogout = () => {
    logoutUser()
    router.replace('/')
    router.reload()
  }

  return (
    <div className={style.menuBar}>
      <Container className='menu-bar__items'>
        {authUser?.uid ? (
          <>
            <Link href='/pedidos'>
              <a>
                <Menu.Item>
                  <Icon name='shopping basket' />
                  {!isLittleMobile && 'Mis pedidos'}
                </Menu.Item>
              </a>
            </Link>
            <Link href='/cuenta'>
              <a>
                <Menu.Item>
                  <Icon name='user outline' />
                  {!isLittleMobile && `${authUser?.name}`}
                </Menu.Item>
              </a>
            </Link>
            <Link href='/carrito'>
              <a>
                <Menu.Item className='icon_pointer'>
                  <Icon name='cart' />
                  {!isLittleMobile && 'Carrito'}
                  {numberCart > 0 && (
                    <Label color='red' floating circular>
                      {productsInCart}
                    </Label>
                  )}
                </Menu.Item>
              </a>
            </Link>
            <Menu.Item className='icon_pointer' onClick={handleLogout}>
              <Icon name='power off' />
              {!isLittleMobile && 'Cerrar sesión'}
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item onClick={() => setShowModal(true)}>
              <Icon name='user outline' />
              Iniciar sesión
            </Menu.Item>
            <Link href='/carrito'>
              <a>
                <Menu.Item className='icon_pointer'>
                  <Icon name='cart' />
                  Carrito
                  {numberCart > 0 && (
                    <Label color='red' floating circular>
                      {productsInCart}
                    </Label>
                  )}
                </Menu.Item>
              </a>
            </Link>
          </>
        )}
      </Container>
      <BasicModal
        title={titleModal}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <Auth setTitleModal={setTitleModal} setShowModal={setShowModal} />
      </BasicModal>
    </div>
  )
}

export default MenuBar
