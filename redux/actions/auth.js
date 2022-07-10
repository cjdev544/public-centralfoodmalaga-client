import { toast } from 'react-toastify'
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from 'firebase/auth'

import { types } from '../types'
import { auth, googleProvider } from '../../firebase/config'
import { suscribeEmail } from '../../helpers/suscribeEmail'

export const loginAndRegisterWhithGoogle = () => {
  return (dispatch) => {
    signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        const { uid, displayName } = userCredential.user
        dispatch(loginUser(uid, displayName, 'google'))
      })
      .catch((err) => {
        console.log(err)
        toast.error('Error al conectar con Gmail! intente mas tarde')
      })
  }
}

export const registerWhithEmailAndPassword = (
  email,
  password,
  displayName,
  subscribe,
  setShowModal,
  setIsLoading
) => {
  return (dispatch) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(user, { displayName })
        // Call suscribe email marketing api
        if (subscribe) suscribeEmail(email)
        dispatch(
          loginWhitEmailAndPassword(
            email,
            password,
            subscribe,
            setShowModal,
            setIsLoading
          )
        )
      })
      .catch((err) => {
        console.log(err)
        toast.error('Error al registrar usuario')
        setShowModal(false)
        setIsLoading(false)
      })
  }
}

export const loginWhitEmailAndPassword = (
  emailUser,
  password,
  subscribe,
  setShowModal,
  setIsLoading
) => {
  return (dispatch) => {
    signInWithEmailAndPassword(auth, emailUser, password)
      .then((userCredential) => {
        const { uid, displayName, email } = userCredential.user
        // Call suscribe email marketing api
        if (subscribe) suscribeEmail(emailUser)
        dispatch(loginUser(uid, displayName, email, 'password'))
        setShowModal(false)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        toast.warning('Error al iniciar sesión')
        setShowModal(false)
        setIsLoading(false)
      })
  }
}

export const loginUser = (uid, displayName, email, provider) => ({
  type: types.login,
  payload: { uid, displayName, email, provider },
})

export const logoutFirebase = () => {
  return (dispatch) => {
    signOut(auth)
      .then(() => dispatch(logout()))
      .catch((err) => console.log(err))
  }
}

export const resetPasswordFirebase = (email) => {
  return (dispatch) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success('El correo de reseteo de contraseña ha sido enviado')
      })
      .catch(() => {
        toast.error('El correo de reseteo de contrseña, no pudo ser enviado')
      })
  }
}

export const updateEmailFirebase = (formData, setIsLoading) => {
  return async (dispatch) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )
      await updateEmail(userCredential.user, formData.newEmail)
      toast.success('El email fue cambiado correctamente')
      setIsLoading(false)
      dispatch(updateEmailUser(formData.newEmail))
    } catch (err) {
      console.log(err)
      toast.error('Error al cambiar el correo')
      setIsLoading(false)
    }
  }
}

const updateEmailUser = (email) => ({
  type: types.updateEmail,
  payload: email,
})

export const updateNameFirebase = (formData, setIsLoading) => {
  return async (dispatch) => {
    try {
      const user = auth.currentUser
      await updateProfile(user, {
        displayName: `${formData.name} ${formData.lastname}`,
      })
      toast.success('El nombre fue cambiado correctamente')
      setIsLoading(false)
      dispatch(updateNameUser(`${formData.name} ${formData.lastname}`))
    } catch (err) {
      console.log(err)
      toast.error('Error al cambiar el nombre')
      setIsLoading(false)
    }
  }
}

const updateNameUser = (userName) => ({
  type: types.updateName,
  payload: userName,
})

export const updatePasswordUser = (formData, setIsLoading) => {
  return async (dispatch) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )

      await updatePassword(userCredential.user, formData.sewPassword)
      toast.success('La contraseña fue cambiada correctamente')
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      toast.error('Error al cambiar la contraseña')
      setIsLoading(false)
    }
  }
}

const logout = () => ({
  type: types.logout,
})
