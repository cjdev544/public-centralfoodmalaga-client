import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { toast } from 'react-toastify'
import { round } from 'mathjs'

import { useAuth } from '../../../../hooks/useAuth'
import { useCart } from '../../../../hooks/useCart'
import { useData } from '../../../../hooks/useData'
import { useOrders } from '../../../../hooks/useOrders'
import { calculateDeliveryCost } from '../../../../helpers/calculateDeliveryCost'

const FormPayment = ({ products, address, values, totalPriceToPay }) => {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [priceShipping, setPriceShipping] = useState(0)
  const [discount, setDiscount] = useState(null)
  const [total, setTotal] = useState(null)

  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()

  const { authUser } = useAuth()
  const { data } = useData()
  const { orders, firstBuyDiscount, addNewOrder } = useOrders()
  const { removeAllProductsCart } = useCart()

  const isOpen = data?.isOpen

  useEffect(() => {
    if (values?.shipping === 'Entrega a domicilio') {
      const cost = calculateDeliveryCost(data?.chippingCost, address)
      setPriceShipping(parseFloat(cost))
    } else {
      setPriceShipping(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values?.shipping, address])

  useEffect(() => {
    if (firstBuyDiscount && !orders?.length) {
      const newTotal =
        totalPriceToPay - (totalPriceToPay * firstBuyDiscount) / 100
      setDiscount(round(newTotal, 2))
    }
  }, [firstBuyDiscount, orders?.length, totalPriceToPay])

  useEffect(() => {
    if (totalPriceToPay) {
      setTotal(round(totalPriceToPay + priceShipping, 2))
    }
  }, [totalPriceToPay, priceShipping])

  useEffect(() => {
    if (discount) {
      setTotal(round(discount + priceShipping, 2))
    }
  }, [discount, priceShipping])

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  }

  if (values?.cutlery === 'Si') {
    values.cubiertosParaPersonas = values?.numberCutlery
  } else {
    values.cubiertosParaPersonas = 0
  }

  if (values.isDeliveryNow !== 'Programar') {
    values.fechaEntrega = 'Hoy'
    values.horaEntrega = 'Lo antes posible'
  } else {
    values.fechaEntrega = values?.dateDelivery
    values.horaEntrega = values?.timeDelivery
  }

  const handleChange = async (e) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(e.empty)
    setError(e.error ? e.error.message : '')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)

    try {
      const res = await fetch('/api/stripe', {
        body: JSON.stringify({
          products,
          idUser: authUser.uid,
          username: authUser.name,
          addressShipping: address,
          values,
          priceShipping,
        }),
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
      })

      const response = await res.json()

      const { clientSecret, order } = response

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })

      if (payload.error) {
        setError(`Error en el pago. ${payload.error.message}`)
        toast.error(payload.error.message)
        setProcessing(false)
      } else {
        // Create order in firebase
        addNewOrder(order)
        setError(null)
        setProcessing(false)
        setSucceeded(true)
        router.push('/pedidos')
        removeAllProductsCart()
      }
    } catch (err) {
      console.log(err)
      setProcessing(false)
      toast.error('Error en el servidor, intente nuevamente')
      return null
    }
  }

  return (
    <form className='form-payment' id='payment-form' onSubmit={handleSubmit}>
      {!isOpen && isOpen !== null && (
        <div className='is-close'>
          <p>
            En estos momentos nos encontramos cerrados para realizar nuevos
            pedidos
          </p>
        </div>
      )}
      <p>
        <span className='payment-span'>
          Total productos: {totalPriceToPay}€
        </span>
        {discount && (
          <>
            <span className='payment-span'>
              Descuento por ser primera compra: {firstBuyDiscount}%
            </span>
            <span className='payment-span'>
              Total con el descuento: {discount}€
            </span>
          </>
        )}
        {values?.shipping === 'Entrega a domicilio' && (
          <span className='payment-span'>Costo de envío: {priceShipping}€</span>
        )}
      </p>
      <h3>Total a pagar: {total}€</h3>
      <span>C.P = Codigo Postal</span>

      {isOpen && (
        <>
          <CardElement
            id='card-element'
            options={cardStyle}
            onChange={handleChange}
          />
          <button disabled={processing || disabled || succeeded} id='submit'>
            <span id='button-text'>
              {processing ? (
                <div className='spinner' id='spinner'></div>
              ) : (
                'Pagar'
              )}
            </span>
          </button>
        </>
      )}
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className='card-error' role='alert'>
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? 'result-message' : 'result-message hidden'}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`}>
          {' '}
          Stripe dashboard.
        </a>{' '}
        Refresh the page to pay again.
      </p>
    </form>
  )
}

export default FormPayment
