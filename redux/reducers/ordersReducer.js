import { types } from '../types'

export const ordersReducer = (state = null, action) => {
  switch (action.type) {
    case types.getUserOrders:
      return {
        ...state,
        orders: action.payload,
      }

    case types.addNewOrder:
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      }

    case types.changeOrder:
      return {
        ...state,
        orders: state?.orders?.map((order) =>
          order.id === action.payload.id ? action.payload : order
        ),
      }

    case types.getFirstBuyDiscount:
      return {
        ...state,
        firstBuyDiscount: action.payload,
      }

    default:
      return state
  }
}
