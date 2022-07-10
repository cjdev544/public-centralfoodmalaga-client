import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import PedidosPage from '../components/PedidosPage'
import { useAuth } from '../hooks/useAuth'
import Seo from '../components/Seo'

const Pedidos = () => {
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
      <Seo title='Mis pedidos' />
      <main>
        <PedidosPage />
      </main>
    </>
  )
}

export default Pedidos
