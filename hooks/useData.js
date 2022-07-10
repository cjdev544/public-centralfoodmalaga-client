import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  getDataHomepageFirebase,
  getProductFirebase,
  getProductsFirebase,
  getRestaurantsFirebase,
  getShippingCostFirebase,
  isOpenOrClose,
} from '../redux/actions/data'

export const useData = () => {
  const dispatch = useDispatch()

  const data = useSelector((state) => state.data)

  useEffect(() => {
    if (!data?.shippingCost) {
      dispatch(getShippingCostFirebase())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (data?.isOpen === undefined) {
      dispatch(isOpenOrClose())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!data?.products) {
      dispatch(getProductsFirebase())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!data?.restaurants) {
      dispatch(getRestaurantsFirebase())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!data?.homepage) {
      dispatch(getDataHomepageFirebase())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getProduct = (productId) => {
    dispatch(getProductFirebase(productId))
  }

  return {
    data,
    getProduct,
  }
}
