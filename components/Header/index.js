import { useOrders } from '../../hooks/useOrders'
import TopBar from './TopBar'
import MenuBar from './MenuBar'
import OrderAlert from '../OrderAlert'
import style from './Header.module.css'

const Header = () => {
  const { ordersAlert } = useOrders()

  return (
    <>
      <div className={style.header}>
        <TopBar />
      </div>
      <div className={style.header__fix}>
        <MenuBar />
        {ordersAlert?.length > 0 &&
          ordersAlert?.map((order) => (
            <OrderAlert key={order?.id} order={order} />
          ))}
      </div>
    </>
  )
}

export default Header
