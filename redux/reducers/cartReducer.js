import { types } from '../types'

const initialState = {
  productsInCart: 0,
  productsCart: [],
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getProductsCart:
      return {
        ...state,
        productsCart: action.payload,
        productsInCart: action.payload?.length,
      }

    case types.addProductCart:
      return {
        ...state,
        productsCart: action.payload,
        productsInCart: action.payload?.length,
      }

    case types.updateProductCart:
      return {
        ...state,
        productsCart: action.payload,
        productsInCart: action.payload?.length,
      }

    case types.removeProductCart:
      if (action.payload?.lengt > 0) {
        return {
          ...state,
          productsCart: action.payload,
          productsInCart: action.payload?.length,
        }
      } else {
        return initialState
      }

    case types.removeAllProductsCart:
      return initialState

    default:
      return state
  }
}
