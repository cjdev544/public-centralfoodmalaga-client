import { useEffect, useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const Auth = ({ setTitleModal, setShowModal }) => {
  const [showLogin, setShowLogin] = useState(true)

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

export default Auth
