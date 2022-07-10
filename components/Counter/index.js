import { useEffect, useRef, useState } from 'react'
import { useOrders } from '../../hooks/useOrders'

import style from './Counter.module.css'

const Counter = ({ order, setOrderAlert }) => {
  const { ordersAlert, setOrdersAlert } = useOrders()

  const timeStorage = Number(localStorage.getItem(`orderCF_${order.id}`))
  const dateTarget = new Date(timeStorage)
  const minutesTarget = (dateTarget - Date.now()) / 1000 / 60

  const [counter, setCounter] = useState(parseInt(minutesTarget))
  const [counter2, setCounter2] = useState(parseInt(minutesTarget + 10))

  let intervalRef = useRef()

  useEffect(() => {
    intervalRef.current = setInterval(decreaseNum, 1000 * 60)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      const changeOrdersInAlert = ordersAlert?.filter(
        (orde) => orde.id !== order.id
      )
      localStorage.removeItem(`orderCF_${order.id}`)
      setOrdersAlert(changeOrdersInAlert)
      setCounter2(null)
      setOrderAlert(false)
    }, counter2 * 1000 * 60)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const decreaseNum = () => setCounter((prev) => prev - 1)

  if (counter <= 0) clearInterval(intervalRef.current)

  return (
    <>
      {counter > 0 ? (
        <h3 className={style.text}>
          El pedido será entregado aproximadamente en {counter}{' '}
          {counter === 1 ? 'minuto' : 'minutos'}
        </h3>
      ) : (
        <h3 className={style.text}>El pedido está por llegar muy pronto</h3>
      )}
    </>
  )
}

export default Counter
