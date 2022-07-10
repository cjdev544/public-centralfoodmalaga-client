import { types } from '../types'

export const dataUserReducer = (state = null, action) => {
  switch (action.type) {
    case types.getAddressesUser:
      return {
        ...state,
        addresses: action.payload,
      }

    case types.getOrdersUser:
      return {
        ...state,
        orders: action.payload,
      }

    case types.createAddress:
      return {
        ...state,
        addresses: [...state?.addresses, action.payload],
      }

    case types.updateAddress:
      return {
        ...state,
        addresses: state?.addresses?.map((address) =>
          address.id === action.payload.id ? action.payload : address
        ),
      }

    case types.deleteAddress:
      return {
        ...state,
        addresses: state?.addresses?.filter(
          (address) => address.id !== action.payload
        ),
      }

    default:
      return state
  }
}
