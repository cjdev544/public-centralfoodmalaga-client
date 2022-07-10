import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Counter from '../Counter'

import style from './OrderAlert.module.css'

const OrderAlert = ({ order }) => {
  const auth = useSelector((state) => state.auth)
  const [alert, setAlert] = useState(null)
  const [orderSend, setOrderSend] = useState(order?.orderSend)
  const [orderAlert, setOrderAlert] = useState(true)

  useEffect(() => {
    if (order?.orderSend) {
      setOrderSend(true)
    }
  }, [order])

  useEffect(() => {
    if (orderSend) {
      setAlert({
        msg: `El pedido N°${order?.id}`,
        msg2: 'YA VA EN CAMINO. Gracias por preferirnos y que aproveche',
        emoji: '🏍️',
        color: '#69af00',
      })
    } else {
      if (order?.deliveryIn === undefined) {
        setAlert({
          msg: `Hola ${auth?.name}, en breve será notificado con la confirmación del pedido N°${order?.id} y el tiempo estimado para su entrega`,
          color: '#ff5400',
        })
      } else {
        setAlert({
          msg: `El pedido N°${order?.id}`,
          msg2: 'SE ESTÁ PREPARANDO',
          emoji: '👩‍🍳',
          color: '#69af00',
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order])

  if (!orderAlert) return null

  return (
    <div className={style.alert} style={{ backgroundColor: `${alert?.color}` }}>
      <h3 className={style.text}>
        {alert?.msg} <span className={style.emoji}>{alert?.emoji}</span>{' '}
        {alert?.msg2}
      </h3>
      {order?.deliveryIn !== undefined && (
        <Counter order={order} setOrderAlert={setOrderAlert} />
      )}
    </div>
  )
}

export default OrderAlert
