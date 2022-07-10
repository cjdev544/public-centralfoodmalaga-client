import {
  query,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from 'firebase/firestore'

import { types } from '../types'
import { db } from '../../firebase/config'

export const getRestaurantsFirebase = () => {
  return async (dispatch) => {
    const array = []
    const q = query(collection(db, 'restaurants'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      array.push({ id: doc.id, ...doc.data() })
    })
    const sortArray = array?.sort((a, b) => a.position - b.position)
    dispatch(getRestaurants(sortArray))
  }
}

const getRestaurants = (restaurants) => ({
  type: types.getRestaurants,
  payload: restaurants,
})

export const getProductsFirebase = () => {
  return async (dispatch) => {
    const array = []
    const q = query(collection(db, 'products'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      array.push({ id: doc.id, ...doc.data() })
    })
    dispatch(getProducts(array))
  }
}

const getProducts = (products) => ({
  type: types.getProducts,
  payload: products,
})

export const getProductFirebase = (productId) => {
  return async (dispatch) => {
    const productRef = doc(db, 'products', productId)
    const docSnap = await getDoc(productRef)

    if (docSnap.exists()) {
      dispatch(getProduct({ ...docSnap.data(), id: docSnap.id }))
    }
  }
}

const getProduct = (product) => ({
  type: types.getProduct,
  payload: product,
})

export const getDataHomepageFirebase = () => {
  return async (dispatch) => {
    const array = []
    const q = query(collection(db, 'homepage'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      array.push({ id: doc.id, ...doc.data() })
    })
    dispatch(getDataHomepage(array))
  }
}

const getDataHomepage = (data) => ({
  type: types.getDataHomepage,
  payload: data,
})

export const getShippingCostFirebase = () => {
  return async (dispatch) => {
    const array = []
    const q = query(collection(db, 'shipping'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      array.push({ id: doc.id, ...doc.data() })
    })
    dispatch(getShippingCost(array))
  }
}

const getShippingCost = (shippingCost) => ({
  type: types.getShippingCost,
  payload: shippingCost,
})

export const isOpenOrClose = () => {
  return (dispatch) => {
    try {
      onSnapshot(doc(db, 'openClose', '8Wru5Z1vmVYRzzNbBOJA'), (doc) => {
        dispatch(setIsOpenOrClose(doc.data()?.isOpen))
      })
    } catch (err) {
      console.log(err)
      return null
    }
  }
}

const setIsOpenOrClose = (isOpen) => ({
  type: types.isOpenRestaurant,
  payload: isOpen,
})
