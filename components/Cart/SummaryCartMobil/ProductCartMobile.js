import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { round } from 'mathjs'
import { Grid, Icon } from 'semantic-ui-react'

import { useLocalStorage } from '../../../hooks/useLocalStorage'
import NoImage from '../../../public/no-image.png'
import {
  removePlateStorage,
  updatePlateStorage,
} from '../../../redux/actions/cart'
import style from './SummaryCartMobile.module.css'

const ProductCartMobile = ({ plate }) => {
  const dispatch = useDispatch()
  const { updateProductCart, deleteProductCart } = useLocalStorage()

  const [counter, setCounter] = useState(plate.number)
  const [total, setTotal] = useState(plate?.precio)

  useEffect(() => {
    setTotal(round(plate?.precio * counter, 2))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter])

  useEffect(() => {
    if (counter > 0) {
      handleClick()
    }
    if (counter === 0) {
      deleteProduct()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter])

  const plusPlate = () => {
    setCounter(counter + 1)
  }

  const minusPlate = () => {
    setCounter(counter - 1)
  }

  const handleClick = () => {
    const cart = updateProductCart(plate, counter)
    dispatch(updatePlateStorage(cart))
  }

  const deleteProduct = () => {
    const cart = deleteProductCart(plate)
    dispatch(removePlateStorage(cart))
  }

  return (
    <div className={style.cartPhone}>
      <Grid className='cart-phone__grid'>
        <Grid.Column width={3} className={style.phoneImage}>
          <Image
            src={plate?.image ? plate.image : NoImage}
            alt={plate.title}
            width={120}
            height={100}
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <div className='cart-phone__text-info'>
            <h4>{plate?.nombre}</h4>
            <span>Precio unitario: {plate?.precio}€</span>
            <span className={style.subtotal}>Subtotal: {total}€</span>
          </div>
        </Grid.Column>
        <Grid.Column width={5} className={style.phonePrice}>
          <Icon name='minus circle' link onClick={minusPlate} />
          <span>{counter}</span>
          <Icon name='plus circle' link onClick={plusPlate} />
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default ProductCartMobile
