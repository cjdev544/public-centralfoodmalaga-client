import { types } from '../types'

const initialState = {
  loading: false,
  showModal: false,
}

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiShowModal:
      return {
        ...state,
        showModal: action.payload,
      }

    case types.uiIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      }

    case types.uiShowModal:
      return {
        ...state,
        showModal: action.payload,
      }

    default:
      return state
  }
}
