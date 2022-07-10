import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'

import { auth } from '../firebase/config'
import {
  loginAndRegisterWhithGoogle,
  loginUser,
  loginWhitEmailAndPassword,
  logoutFirebase,
  registerWhithEmailAndPassword,
  resetPasswordFirebase,
  updateEmailFirebase,
  updateNameFirebase,
  updatePasswordUser,
} from '../redux/actions/auth'

export const useAuth = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const authUser = state?.auth

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        const { uid, displayName, email, providerData } = user
        const provider = providerData[0].providerId
        if (!authUser?.uid) {
          dispatch(loginUser(uid, displayName, email, provider))
        }
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loginGoogle = () => {
    dispatch(loginAndRegisterWhithGoogle())
  }

  const loginEmail = (
    email,
    password,
    subscribe,
    setShowModal,
    setIsLoading
  ) => {
    dispatch(
      loginWhitEmailAndPassword(
        email,
        password,
        subscribe,
        setShowModal,
        setIsLoading
      )
    )
  }

  const registerEmail = (
    email,
    password,
    displayName,
    wantSubscribe,
    setShowModal,
    setIsLoading
  ) => {
    dispatch(
      registerWhithEmailAndPassword(
        email,
        password,
        displayName,
        wantSubscribe,
        setShowModal,
        setIsLoading
      )
    )
  }

  const logoutUser = () => {
    dispatch(logoutFirebase())
  }

  const resetPassword = (email) => {
    dispatch(resetPasswordFirebase(email))
  }

  const updateEmailUser = (formData, setIsLoading) => {
    dispatch(updateEmailFirebase(formData, setIsLoading))
  }

  const updateNameUser = (formData, setIsLoading) => {
    dispatch(updateNameFirebase(formData, setIsLoading))
  }

  const updatePassword = (formData, setIsLoading) => {
    dispatch(updatePasswordUser(formData, setIsLoading))
  }

  return {
    authUser,
    loginGoogle,
    loginEmail,
    registerEmail,
    logoutUser,
    resetPassword,
    updateEmailUser,
    updateNameUser,
    updatePassword,
  }
}
