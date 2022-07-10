import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button, Grid, Icon } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { round } from 'mathjs'
import { useRouter } from 'next/router'

import { useData } from '../../hooks/useData'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useCart } from '../../hooks/useCart'
import ArrowBack from '../ArrowBack'
import NoImage from '../../public/no-image.png'
import style from './Plate.module.css'
import DefaultLoader from '../DefaultLoader'
import RadioButtom from '../RadioButtom'

const Plate = ({ product }) => {
  const [rest, setRest] = useState(null)
  const [counter, setCounter] = useState(1)
  const [total, setTotal] = useState(product?.precio)
  const [isEnable, setIsEnable] = useState(null)
  const [restName, setRestName] = useState('')
  const [isPepper, setIsPepper] = useState(false)
  const [radioButtom, setRadioButtom] = useState(false)
  const [pepperPlate, setPepperPlate] = useState(null)

  const router = useRouter()
  const { addProductCart } = useLocalStorage()
  const { addPlateInCart } = useCart()

  const { data, getProduct } = useData()

  useEffect(() => {
    if (product) {
      getProduct(product.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  useEffect(() => {
    if (data?.product) {
      const restaurantProduct = {
        sushiguay: 'Sushi Guay',
        guaywok: 'Guay Wok',
        'sabor-casita': 'Con Sabor a Casita',
        'hamburgueseria-venezuela': 'La Hamburguesería VZLA',
        'postres-bebidas': 'Postres y Bebidas',
      }
      const productRestaurant = restaurantProduct[product?.restaurante]
      setRestName(productRestaurant)
      setRest(productRestaurant)
      if (!data?.product?.disponible) {
        router.replace('/')
        toast.warning(
          `${product?.nombre} no se encuentra disponible en estos momentos`
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.product])

  useEffect(() => {
    setTotal(round(product?.precio * counter, 2))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter])

  useEffect(() => {
    if (data?.product) {
      const restaurantProduct = data?.restaurants.filter(
        (rest) => rest.page === product.restaurante
      )

      if (restaurantProduct[0].isOpen) {
        setIsEnable(true)
      } else {
        setIsEnable(false)
      }
    }
  }, [data, product])

  useEffect(() => {
    if (product) {
      const plateIsPepper = product.path.includes('noodles')
      if (plateIsPepper) {
        setIsPepper(true)
      } else {
        setIsPepper(false)
      }
    }
  }, [product])

  useEffect(() => {
    if (isPepper) {
      let msg
      if (radioButtom) {
        msg = '(Con Picante)'
      } else {
        msg = '(Sin Picante)'
      }
      setPepperPlate({ ...product, nombre: `${product.nombre} ${msg}` })
    }
  }, [product, isPepper, radioButtom])

  const plusPlate = () => {
    setCounter(counter + 1)
  }

  const minusPlate = () => {
    if (counter > 1) {
      setCounter(counter - 1)
    }
  }

  const handleClick = () => {
    const cart = addProductCart(pepperPlate || product, counter)
    toast.success('Producto agregado al carrito')
    addPlateInCart(cart)
    router.push('/postres-bebidas')
  }

  if (!product?.id || !rest) return <DefaultLoader />

  return (
    <>
      <Grid className={`${style.plate} plate`}>
        <Grid.Column mobile={16} tablet={6} computer={6}>
          <Image
            src={product.image ? product.image : NoImage}
            alt={product.nombre}
            width={340}
            height={260}
          />
          <div className={style.category}>
            <p>{rest?.type}</p>
            <p>
              Categoria: <span>{product.categoria}</span>
            </p>
          </div>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={10} computer={10}>
          <div className={style.title}>{product.nombre.toUpperCase()}</div>
          <div className={style.rest}>
            Restaurante: <span>{rest}</span>
          </div>
          <div className={style.description}>
            {product.descripcion}
            {isPepper && (
              <RadioButtom
                radioButtom={radioButtom}
                setRadioButtom={setRadioButtom}
              />
            )}
          </div>
          <div className={style.minus}>
            <Icon name='minus circle' link onClick={minusPlate} />
            <span>{counter}</span>
            <Icon name='plus circle' link onClick={plusPlate} />
          </div>
          <div className={style.buy}>
            <div className={style.price}>
              <p>
                Precio: <span>{`${total} €`}</span>
              </p>
            </div>
            {isEnable ? (
              <Button className='plate__buy-btn' onClick={handleClick}>
                Añadir
              </Button>
            ) : (
              <p
                className={style.disable}
              >{`Los productos de "${restName}" no estan disponibles en este momento`}</p>
            )}
          </div>
        </Grid.Column>
      </Grid>
      <ArrowBack />
    </>
  )
}

export default Plate
