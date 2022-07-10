import { useDispatch, useSelector } from 'react-redux'

import {
  createAddressFirebase,
  deleteAddressFirebase,
  getAddressesUserFirebase,
  updateAddressFirebase,
} from '../redux/actions/dataUser'

export const useDataUser = () => {
  const dispatch = useDispatch()
  const dataUser = useSelector((state) => state.dataUser)

  const getAddressesUser = (userId) => {
    if (!dataUser?.addresses) {
      dispatch(getAddressesUserFirebase(userId))
    }
  }

  const createAddress = (address, setShowModal, setIsLoading) => {
    dispatch(createAddressFirebase(address, setShowModal, setIsLoading))
  }

  const updateAddress = (address, setShowModal, setIsLoading) => {
    dispatch(updateAddressFirebase(address, setShowModal, setIsLoading))
  }

  const deleteAddress = (addressId, setIsLoading) => {
    dispatch(deleteAddressFirebase(addressId, setIsLoading))
  }

  return {
    dataUser,
    getAddressesUser,
    createAddress,
    updateAddress,
    deleteAddress,
  }
}
