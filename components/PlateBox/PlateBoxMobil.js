import Link from 'next/link'
import Image from 'next/image'
import { Grid } from 'semantic-ui-react'
import NoImage from '../../public/no-image.png'
import style from './PlateBoxMobile.module.css'

const PlateBoxMobil = ({ product }) => {
  const cutDescription = product?.descripcion?.substring(0, 51)

  return (
    <article className={`${style.boxMobile} plate-box-mobile`}>
      <Link href={`/plato/${product?.path}`}>
        <a>
          <Grid className='plate-box-mobile__grid'>
            <Grid.Column width={4} className='mobile-grid__image'>
              <Image
                src={product?.image ? product.image : NoImage}
                alt={product.nombre}
                width={76}
                height={70}
              />
            </Grid.Column>
            <Grid.Column width={9}>
              <div className='plate-box-mobile__text-info'>
                <h2>{product?.nombre?.toUpperCase()}</h2>
                {product?.descripcion?.length > 51 ? (
                  <p>{cutDescription}...</p>
                ) : (
                  <p>{cutDescription}</p>
                )}
              </div>
            </Grid.Column>
            <Grid.Column width={3} className='mobile-grid__price'>
              <p>{product?.precio} €</p>
            </Grid.Column>
          </Grid>
        </a>
      </Link>
    </article>
  )
}

export default PlateBoxMobil
