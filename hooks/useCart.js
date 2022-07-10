import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CART } from '../helpers/constants'
import {
  addPlateCart,
  getProductsCart,
  removeCart,
} from '../redux/actions/cart'
import { useData } from './useData'

export const useCart = () => {
  const dispatch = useDispatch()
  const { productsCart, productsInCart, dataPayment } = useSelector(
    (state) => state.cart
  )
  const { data } = useData()

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem(CART))
    if (cart?.length > 0 && data) dispatch(getProductsCart(cart))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.restaurants])

  const addPlateInCart = (cart) => {
    dispatch(addPlateCart(cart))
  }

  const removeAllProductsCart = () => {
    localStorage.removeItem(CART)
    dispatch(removeCart())
  }

  return {
    productsCart,
    productsInCart,
    dataPayment,
    addPlateInCart,
    removeAllProductsCart,
  }
}
