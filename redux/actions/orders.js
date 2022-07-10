import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import {
  collection,
  query,
  where,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore'

import { db } from '../../firebase/config'
import { types } from '../types'

export const getUserOrdersFirebase = (userId) => {
  return async (dispatch) => {
    const array = []
    const ordersRef = collection(db, 'orders')
    const q = query(ordersRef, where('usuario', '==', userId))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      array.push({ id: doc.id, ...doc.data() })
    })
    const sortOrders = array?.sort((a, b) => b.createdAt - a.createdAt)
    dispatch(getUserOrder(sortOrders))
  }
}

const getUserOrder = (orders) => ({
  type: types.getUserOrders,
  payload: orders,
})

export const addNewOrderFirebase = (order) => {
  return async (dispatch) => {
    try {
      const orderRef = doc(db, 'orders', order.id)
      await setDoc(orderRef, order)
      toast.success('Orden creada correctamente')
      dispatch(addNewOrder(order))
      dispatch(addProductSell(order))
    } catch (err) {
      console.log(err)
      toast.warning(
        'Problemas en el servidor. Si persiste el problema, comuniquese con nosotros'
      )
    }
  }
}

const addProductSell = (order) => {
  return (dispatch) => {
    const productsInOrder = order.pedido
    productsInOrder.forEach((product) => {
      const sellingId = uuidv4()
      const sellingRef = doc(db, 'selling', sellingId)
      dispatch(addProductSellFirebase(product, sellingRef))
    })
  }
}

const addProductSellFirebase = (product, sellingRef) => {
  return async (dispatch) => {
    try {
      await setDoc(sellingRef, {
        ...product,
        createdAt: Date.now(),
      })
    } catch (err) {
      console.log(err)
    }
  }
}

const addNewOrder = (order) => ({
  type: types.addNewOrder,
  payload: order,
})

export const changeInOrder = (order) => ({
  type: types.changeOrder,
  payload: order,
})

export const getFirstBuyDiscountFirebase = () => {
  return async (dispatch) => {
    const array = []
    const q = query(collection(db, 'firstBuy'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      array.push({ id: doc.id, ...doc.data() })
    })
    dispatch(getFirstBuy(array[0]?.cost))
  }
}

const getFirstBuy = (descount) => ({
  type: types.getFirstBuyDiscount,
  payload: descount,
})
