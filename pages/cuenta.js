import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { useAuth } from '../hooks/useAuth'
import DefaultLoader from '../components/DefaultLoader'
import Seo from '../components/Seo'
import UserAccount from '../components/UserAccount'

const Account = () => {
  const router = useRouter()
  const { authUser } = useAuth()

  useEffect(() => {
    if (!authUser?.uid) {
      router.replace('/')
      toast.warning('Inicia sesión para entrar en tu cuenta')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser?.uid])

  return (
    <>
      <Seo title='Mi cuenta' />
      <main>{!authUser?.uid ? <DefaultLoader /> : <UserAccount />}</main>
    </>
  )
}

export default Account
