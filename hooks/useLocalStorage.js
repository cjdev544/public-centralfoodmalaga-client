import { CART } from '../helpers/constants'

export const useLocalStorage = () => {
  const addProductCart = (plate, number) => {
    plate.number = number
    const cart = JSON.parse(localStorage.getItem(CART))
    if (cart) {
      const newStorage = cart?.filter(
        (plateStorage) => plateStorage.id !== plate.id
      )
      newStorage.push(plate)

      localStorage.setItem(CART, JSON.stringify(newStorage))
      return newStorage
    } else {
      localStorage.setItem(CART, JSON.stringify([plate]))
      return [plate]
    }
  }

  const updateProductCart = (product, number) => {
    product.number = number
    const cart = JSON.parse(localStorage.getItem(CART))
    const newStorage = cart?.map((productCart) =>
      productCart.id === product.id ? product : productCart
    )
    localStorage.setItem(CART, JSON.stringify(newStorage))
    return newStorage
  }

  const deleteProductCart = (product) => {
    const cart = JSON.parse(localStorage.getItem(CART))

    const newStorage = cart?.filter(
      (plateStorage) => plateStorage.id !== product.id
    )
    if (newStorage?.length > 0) {
      localStorage.setItem(CART, JSON.stringify(newStorage))
    } else {
      localStorage.removeItem(CART)
    }
    return newStorage
  }

  return {
    addProductCart,
    updateProductCart,
    deleteProductCart,
  }
}
