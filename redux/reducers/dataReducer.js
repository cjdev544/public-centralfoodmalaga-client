import { types } from '../types'

export const dataReducer = (state = null, action) => {
  switch (action.type) {
    case types.getRestaurants:
      return {
        ...state,
        restaurants: action.payload,
      }

    case types.getProducts:
      return {
        ...state,
        products: action.payload,
      }

    case types.getProduct:
      return {
        ...state,
        product: action.payload,
      }

    case types.getDataHomepage:
      return {
        ...state,
        homepage: action.payload,
      }

    case types.getShippingCost:
      return {
        ...state,
        chippingCost: action.payload,
      }

    case types.isOpenRestaurant:
      return {
        ...state,
        isOpen: action.payload,
      }

    default:
      return state
  }
}
