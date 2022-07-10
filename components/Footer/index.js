import Link from 'next/link'
const { Grid, Container, Icon } = require('semantic-ui-react')
import style from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={style.footer}>
      <Container>
        <Grid>
          <Grid.Column mobile={16} tablet={6} computer={6}>
            <h4>Visita nuestras redes</h4>
            <div className={style.icon}>
              <a
                href='https://www.facebook.com/Centralfoodmalaga'
                target='_blank'
                rel='noreferrer'
                aria-label='Facebook'
              >
                <Icon name='facebook' />
              </a>
              <a
                href='https://www.instagram.com/centralfoodmalaga/'
                target='_blank'
                rel='noreferrer'
                aria-label='Instagram'
              >
                <Icon name='instagram' />
              </a>
              <a
                href='https://api.whatsapp.com/send?phone=+34649718831'
                target='_blank'
                rel='noreferrer'
                aria-label='Whatsapp'
              >
                <Icon name='whatsapp' />
              </a>
            </div>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={5} computer={5}>
            <h4>Legales</h4>
            <div className={style.legacy}>
              <Link href='/politica-privacidad'>
                <a>
                  <p>Política de privacidad</p>
                </a>
              </Link>
            </div>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={5} computer={5}>
            <h4>Local</h4>
            <div className={style.local}>
              <a
                href='https://www.google.com/maps/place/Central+food+M%C3%A1laga/@36.7212638,-4.4411586,17z/data=!3m1!4b1!4m5!3m4!1s0xd72f73a27895f9b:0x783c668421062425!8m2!3d36.7212596!4d-4.4389589?hl=es'
                target='_blank'
                rel='noreferrer'
                aria-label='Mapa'
                className={style.map}
              >
                Ver mapa
                <Icon name='map marker alternate' />
              </a>
              <br />
              Av Carlos Haya, con calle Francisco Rueda Perez 1, local 7 29007
              Málaga, España
              <span>Tlf: 649-71-88-31</span>
            </div>
          </Grid.Column>
        </Grid>
        <p className={style.copy}>
          Elaborado por <span>CjDev544</span>
        </p>
      </Container>
    </footer>
  )
}

export default Footer
