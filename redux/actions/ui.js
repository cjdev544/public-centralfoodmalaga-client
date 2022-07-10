import { types } from '../types'

export const uiShowModal = (openOrClose) => ({
  type: types.uiShowModal,
  payload: openOrClose,
})

export const uiIsLoading = (loading) => ({
  type: types.uiIsLoading,
  payload: loading,
})
