import { types } from '../types'

export const getProductsCart = (cart) => ({
  type: types.addProductCart,
  payload: cart,
})

export const addPlateCart = (cart) => ({
  type: types.addProductCart,
  payload: cart,
})

export const updatePlateStorage = (cart) => ({
  type: types.addProductCart,
  payload: cart,
})

export const removePlateStorage = (cart) => ({
  type: types.addProductCart,
  payload: cart,
})

export const removeCart = () => ({
  type: types.removeAllProductsCart,
})
