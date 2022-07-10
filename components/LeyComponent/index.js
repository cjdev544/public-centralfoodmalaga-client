import Image from 'next/image'
import { Grid } from 'semantic-ui-react'
import style from './LeyComponent.module.css'

const LeyComponent = () => {
  return (
    <Grid>
      <Grid.Column className={style.text} mobile={16} tablet={8} computer={8}>
        <p>
          Alergias alimentarias o necesidades dietéticas especiales: Antes de
          realizar su pedido, contacte directamente con en restaurante
          <span>Teléfono: +34 649-71-88-31</span>
        </p>
      </Grid.Column>
      <Grid.Column className={style.image} mobile={16} tablet={8} computer={8}>
        <Image
          src='/menu-ley.png'
          alt='Picture of the author'
          width={300}
          height={200}
        />
      </Grid.Column>
    </Grid>
  )
}

export default LeyComponent
