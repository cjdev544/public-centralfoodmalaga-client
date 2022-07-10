import { useEffect, useState } from 'react'
import LoginForm from '../Auth/LoginForm'
import RegisterForm from '../Auth/RegisterForm'

const AuthAfterCart = ({
  setTitleModal,
  setShowModal,
  loginOrRegister = 'register',
}) => {
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    loginOrRegister === 'login' ? setShowLogin(true) : setShowLogin(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginOrRegister])

  useEffect(() => {
    if (showLogin) {
      setTitleModal('Iniciar sesión')
    } else {
      setTitleModal('Rigistrar usuario')
    }
  }, [showLogin, setTitleModal])

  return showLogin ? (
    <LoginForm setShowLogin={setShowLogin} setShowModal={setShowModal} />
  ) : (
    <RegisterForm setShowLogin={setShowLogin} setShowModal={setShowModal} />
  )
}

export default AuthAfterCart
