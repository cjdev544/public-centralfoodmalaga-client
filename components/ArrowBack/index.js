import { useRouter } from 'next/router'
import { Icon } from 'semantic-ui-react'
import style from './ArrowBack.module.css'

const ArrowBack = () => {
  const router = useRouter()

  return (
    <div className={style.arrow}>
      <Icon name='arrow left' link onClick={() => router.back()} />
    </div>
  )
}

export default ArrowBack
