import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { round } from 'mathjs'
import { Form, Radio } from 'semantic-ui-react'

import { useCart } from '../../hooks/useCart'
import { useDataUser } from '../../hooks/useDataUser'
import { useMediaQueryJs } from '../../hooks/useMediaQueryJs'
import { useAuth } from '../../hooks/useAuth'
import { useData } from '../../hooks/useData'
import { useUi } from '../../hooks/useUi'
import Payment from './Payment'
import ShippingAddress from './ShippingAddress'
import SummaryCart from './SummaryCart'
import SummaryCartMobil from './SummaryCartMobil'
import RadioGroup from '../RadioGroup'
import ArrowBack from '../ArrowBack'
import BasicModal from '../modals/BasicModal'
import AuthAfterCart from '../AuthAfterCart'
import style from './Cart.module.css'

const Cart = () => {
  const { isAMobil } = useMediaQueryJs()
  const { authUser } = useAuth()
  const { dataUser, getAddressesUser } = useDataUser()
  const { productsCart } = useCart()
  const { data } = useData()
  const { showModal, setShowModal } = useUi()

  const [address, setAddress] = useState('Recogida el en local')
  const [addressActive, setAddressActive] = useState(null)
  const [totalPriceToPay, setTotalPriceToPay] = useState(0)
  const [values, setValues] = useState({})
  const [confirmatesProducts, setConfirmatesProducts] = useState(null)
  const [titleModal, setTitleModal] = useState('Rigistrar usuario')
  const [login, setLogin] = useState('register')
  const [cashPayment, setCashPayment] = useState('Tarjeta')

  const addresses = dataUser?.addresses

  useEffect(() => {
    if (productsCart?.length > 0 && data) {
      const productsConfirm = productsCart?.filter((product) => {
        const plate = data.products.find((element) => element.id === product.id)
        if (plate?.disponible) {
          const restOpenOrClose = data.restaurants?.find(
            (element) => element.page === plate.restaurante
          )
          if (restOpenOrClose.isOpen) return plate
        }
      })
      setConfirmatesProducts(productsConfirm)
    }
  }, [productsCart, data])

  useEffect(() => {
    const totalForProductPay = confirmatesProducts?.map((product) => {
      const subTotalForProduct = round(product.precio * product.number, 2)
      product.subTotal = subTotalForProduct
      return subTotalForProduct
    }, [])

    let totalForPay = 0
    totalForProductPay?.forEach((element) => {
      totalForPay += element
    })
    totalForPay = round(totalForPay, 2)
    setTotalPriceToPay(totalForPay)
  }, [confirmatesProducts])

  useEffect(() => {
    if (authUser?.uid) {
      if (!addresses) {
        getAddressesUser(authUser?.uid)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser, addresses])

  useEffect(() => {
    if (values?.shipping === 'Recogida el en local') {
      setAddress('Recogida el en local')
    }
  }, [values])

  useEffect(() => {
    if (
      values?.shipping === 'Entrega a domicilio' &&
      totalPriceToPay < 12 &&
      addressActive
    ) {
      toast.warning(
        'El pedido mínimo para entrega a domicilio debe ser de al menos 12€'
      )
    }
  }, [values?.shipping, totalPriceToPay, addressActive])

  useEffect(() => {
    if (!authUser?.uid) {
      setShowModal(true)
    } else {
      setShowModal(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!authUser?.uid])

  const loginOrRegister = (loginOrRegister) => {
    setShowModal(true)
    setLogin(loginOrRegister)
  }

  return (
    <>
      <div className='cart'>
        {!confirmatesProducts?.length > 0 ? (
          <div className={style.emptyCart}>
            <h2>No se han agregado productos al carrito</h2>
          </div>
        ) : (
          <>
            <div className='full-cart'>
              {!authUser?.uid ? (
                <>
                  <h2>
                    Crea una cuenta o inicia sesión para poder hacer la compra.
                  </h2>
                  <h3>Registrate aquí</h3>
                  <p
                    className={style.showModal}
                    onClick={() => loginOrRegister('register')}
                  >
                    Registrar usuario
                  </p>
                  <h3>Si tienes cuenta inicia sesión aquí</h3>
                  <p
                    className={style.showModal}
                    onClick={() => loginOrRegister('login')}
                  >
                    Iniciar sesión
                  </p>
                </>
              ) : (
                <>
                  {isAMobil ? (
                    <SummaryCartMobil
                      products={confirmatesProducts}
                      totalPriceToPay={totalPriceToPay}
                    />
                  ) : (
                    <SummaryCart
                      products={confirmatesProducts}
                      totalPriceToPay={totalPriceToPay}
                    />
                  )}
                  <RadioGroup setValues={setValues} />
                </>
              )}
              {values?.shipping === 'Entrega a domicilio' && (
                <ShippingAddress
                  setAddress={setAddress}
                  values={values}
                  addressActive={addressActive}
                  setAddressActive={setAddressActive}
                />
              )}
            </div>
            <Form>
              <h4>Metodo de pago:</h4>
              <Form.Field>
                <Radio
                  label='Tarjeta'
                  name='radioGroup'
                  value={'Tarjeta'}
                  checked={cashPayment === 'Tarjeta'}
                  onChange={(e, { value }) => setCashPayment(value)}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label='Efectivo al momento de la entrega'
                  name='radioGroup'
                  value='Efectivo al momento de la entrega'
                  checked={cashPayment === 'Efectivo al momento de la entrega'}
                  onChange={(e, { value }) => setCashPayment(value)}
                />
              </Form.Field>
            </Form>

            {values?.shipping === 'Entrega a domicilio' &&
              totalPriceToPay > 12 &&
              addressActive && (
                <Payment
                  products={confirmatesProducts}
                  address={address}
                  addressActive={addressActive}
                  values={values}
                  totalPriceToPay={totalPriceToPay}
                  cashPayment={cashPayment}
                />
              )}
            {values?.shipping === 'Recogida el en local' &&
              values?.name?.trim() !== '' &&
              values?.phone?.trim() !== '' && (
                <Payment
                  products={confirmatesProducts}
                  address={address}
                  values={values}
                  totalPriceToPay={totalPriceToPay}
                  cashPayment={cashPayment}
                />
              )}
          </>
        )}
      </div>
      <ArrowBack />
      <BasicModal
        title={titleModal}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <AuthAfterCart
          setTitleModal={setTitleModal}
          setShowModal={setShowModal}
          loginOrRegister={login}
        />
      </BasicModal>
    </>
  )
}

export default Cart
