import Link from 'next/link'
import Image from 'next/image'
import { Icon } from 'semantic-ui-react'

import NoImage from '../../public/no-image.png'
import PlateBoxMobil from './PlateBoxMobil'
import { useMediaQueryJs } from '../../hooks/useMediaQueryJs'
import style from './PlateBox.module.css'

const PlateBox = ({ product }) => {
  const { isAMobil } = useMediaQueryJs()

  const cutDescription = product?.descripcion?.substring(0, 70)

  if (isAMobil) return <PlateBoxMobil product={product} />

  return (
    <article className={style.box}>
      <Link href={`/plato/${product?.path}`}>
        <a>
          <Image
            src={product?.image ? product.image : NoImage}
            alt={product.title}
            width={240}
            height={160}
          />
          <div className={style.text}>
            <div className={style.info}>
              <h2>{product?.nombre?.toUpperCase()}</h2>
              {product?.descripcion?.length > 70 ? (
                <p>{cutDescription}...</p>
              ) : (
                <p>{cutDescription}</p>
              )}
            </div>
            <div className='plate-footer'>
              {product?.alergico && (
                <div className={style.alergic}>
                  <Icon name='exclamation circle' />
                  Producto con alérgenos
                </div>
              )}
              <div className={style.price}>
                <p>{product?.precio} €</p>
                <Icon name='plus circle' />
              </div>
            </div>
          </div>
        </a>
      </Link>
    </article>
  )
}

export default PlateBox
