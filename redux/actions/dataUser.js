import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import {
  collection,
  query,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'

import { auth, db } from '../../firebase/config'
import { types } from '../types'

export const getAddressesUserFirebase = (userId) => {
  return async (dispatch) => {
    const array = []
    const q = query(collection(db, 'addresses'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      if (doc.data().user === userId) {
        array.push({ id: doc.id, ...doc.data() })
      }
    })
    dispatch(getAddressesUser(array))
  }
}

const getAddressesUser = (addresses) => ({
  type: types.getAddressesUser,
  payload: addresses,
})

export const createAddressFirebase = (address, setShowModal, setIsLoading) => {
  return async (dispatch) => {
    const addressId = uuidv4()
    const addressRef = doc(db, 'addresses', addressId)
    const user = auth.currentUser

    try {
      await setDoc(addressRef, {
        ...address,
        user: user.uid,
      })
      toast.success('Direción creada correctamente')
      setShowModal(false)
      setIsLoading(false)
      dispatch(
        createAddress({
          ...address,
          user: user.uid,
          id: addressId,
        })
      )
    } catch (err) {
      console.log(err)
      toast.error('Error al crear la dirección')
      setShowModal(false)
      setIsLoading(false)
    }
  }
}

const createAddress = (address) => ({
  type: types.createAddress,
  payload: address,
})

export const updateAddressFirebase = (address, setShowModal, setIsLoading) => {
  return async (dispatch) => {
    const addressRef = doc(db, 'addresses', address.id)

    try {
      await updateDoc(addressRef, address)
      toast.success('Direción actualizada correctamente')
      setShowModal(false)
      setIsLoading(false)
      dispatch(updateAddress(address))
    } catch (err) {
      console.log(err)
      toast.error('Error al actualizar la dirección')
      setShowModal(false)
      setIsLoading(false)
    }
  }
}

const updateAddress = (address) => ({
  type: types.updateAddress,
  payload: address,
})

export const deleteAddressFirebase = (addressId, setIsLoading) => {
  return async (dispatch) => {
    const addressRef = doc(db, 'addresses', addressId)

    try {
      await deleteDoc(addressRef)
      toast.success('Dirección eliminada correctamente')
      dispatch(deleteAddress(addressId))
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      toast.error('Error al eliminar la dirección')
      setIsLoading(false)
    }
  }
}

const deleteAddress = (addressId) => ({
  type: types.deleteAddress,
  payload: addressId,
})
