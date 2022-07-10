import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { doc, onSnapshot } from 'firebase/firestore'

import { db } from '../firebase/config'
import { useAuth } from './useAuth'
import { createCounterInLocalStorage } from '../helpers/createCounterInLocalStorage'
import {
  changeInOrder,
  getUserOrdersFirebase,
  addNewOrderFirebase,
  getFirstBuyDiscountFirebase,
} from '../redux/actions/orders'

export const useOrders = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const orders = state?.orders?.orders
  const firstBuyDiscount = state?.orders?.firstBuyDiscount

  const { authUser } = useAuth()

  const [ordersAlert, setOrdersAlert] = useState(null)

  useEffect(() => {
    if (authUser?.uid) {
      if (!orders) {
        getUserOrders(authUser.uid)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser?.uid])

  useEffect(() => {
    if (!firstBuyDiscount) {
      dispatch(getFirstBuyDiscountFirebase())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstBuyDiscount])

  useEffect(() => {
    if (authUser?.uid && orders?.length > 0) {
      const orderNotShipping = orders.filter(
        (order) => order?.orderSend === undefined
      )
      // Create counter in localStorage
      const ordersStorage = orderNotShipping?.filter(
        (order) => order?.deliveryIn !== undefined
      )

      ordersStorage?.map((order) => {
        const varStorage = localStorage.getItem(`orderCF_${order.id}`)
        if (
          varStorage === '[object Undefined]' ||
          varStorage === null ||
          varStorage === undefined
        ) {
          createCounterInLocalStorage(order)
        }
      })

      // ***********************************
      const ordersAlert = orders?.map((order) => {
        if (localStorage.getItem(`orderCF_${order.id}`)) {
          return order
        }
      })
      const ordersDelyvery = ordersAlert?.filter((order) => order !== undefined)
      const ordersNoDelivery = orders?.filter(
        (order) => order?.deliveryIn === undefined
      )
      const ordersInAlert = [...ordersNoDelivery, ...ordersDelyvery]

      ordersInAlert?.map((order) => listendChange(order))

      if (ordersInAlert?.length > 0) {
        setOrdersAlert(ordersInAlert)
      } else {
        setOrdersAlert(null)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser?.uid, orders])

  const listendChange = (order) => {
    if (orders) {
      const unsusbcribe = onSnapshot(
        doc(db, 'orders', `${order.id}`),
        (doc) => {
          compareOrder(doc.data())
        }
      )
      if (order?.orderSend) unsusbcribe()
    }
  }

  const compareOrder = (order) => {
    const orderCompare = orders?.filter(
      (newOrder) => newOrder.id === order?.id
    )[0]
    if (
      orderCompare?.deliveryIn !== order?.deliveryIn ||
      orderCompare?.orderSend !== order?.orderSend
    ) {
      dispatch(changeInOrder(order))
    }
  }

  const getUserOrders = (userId) => {
    dispatch(getUserOrdersFirebase(userId))
  }

  const addNewOrder = (order) => {
    dispatch(addNewOrderFirebase(order))
  }

  return {
    orders,
    ordersAlert,
    firstBuyDiscount,
    getUserOrders,
    addNewOrder,
    setOrdersAlert,
  }
}
