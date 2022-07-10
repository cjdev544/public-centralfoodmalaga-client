import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container, Input, Grid } from 'semantic-ui-react'

import CentralFoodLogo from '../../../public/central-food.png'
import style from './TopBar.module.css'

const TopBar = () => {
  const [searchStr, setSearchStr] = useState('')
  const [load, setLoad] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (load) {
      router.push(`/busqueda?query=${searchStr}`)
    }
    setLoad(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchStr])

  return (
    <div className={style.topBar}>
      <Container>
        <Grid className={style.topBar}>
          <div className={style.topBar__left}>
            <Link href='/'>
              <a className={style.logo}>
                <Image
                  src={CentralFoodLogo}
                  alt='Central Food logo'
                  width={200}
                  height={200}
                />
                <div className={style.logoText}>
                  <div className={style.logoText__title}>
                    <h1>Central Food</h1>
                    <h3>Málaga</h3>
                  </div>
                  <p>En la variedad esta el gusto</p>
                </div>
              </a>
            </Link>
          </div>
          <div className={`${style.topBar__right} top-bar__right`}>
            <Input
              id='search'
              icon={{ name: 'search' }}
              value={searchStr}
              onChange={(_, data) => setSearchStr(data.value)}
            />
          </div>
        </Grid>
      </Container>
    </div>
  )
}

export default TopBar
