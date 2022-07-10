import { types } from '../types'

export const authReducer = (state = null, action) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
        email: action.payload.email,
        provider: action.payload?.provider || null,
      }

    case types.updateName:
      return {
        ...state,
        name: action.payload,
      }

    case types.updateEmail:
      return {
        ...state,
        email: action.payload,
      }

    case types.logout:
      return null

    default:
      return state
  }
}
