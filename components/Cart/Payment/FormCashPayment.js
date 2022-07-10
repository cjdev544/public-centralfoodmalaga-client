import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Form } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { round } from 'mathjs'

import { useCart } from '../../../hooks/useCart'
import { useData } from '../../../hooks/useData'
import { useOrders } from '../../../hooks/useOrders'
import { useAuth } from '../../../hooks/useAuth'
import { calculateDeliveryCost } from '../../../helpers/calculateDeliveryCost'

const FormCashPayment = ({ products, address, values, totalPriceToPay }) => {
  const [priceShipping, setPriceShipping] = useState(0)
  const [discount, setDiscount] = useState(null)
  const [total, setTotal] = useState(null)
  const [loading, setLoading] = useState(false)
  const [cash, setCash] = useState(null)

  const { authUser } = useAuth()
  const { data } = useData()
  const isOpen = data?.isOpen

  const { orders, firstBuyDiscount, addNewOrder } = useOrders()
  const { removeAllProductsCart } = useCart()

  const router = useRouter()

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!cash) {
      toast.error('Indique la cantidad, para poder enviar su cambio')
      return
    }

    setLoading(true)
    console.log('enviaando...')
    try {
      const res = await fetch('/api/nopay', {
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

      if (response?.msg) {
        toast.error(response.msg)
        setLoading(false)
        return
      }

      const { order } = response
      order.cash = cash
      // Create order in firebase
      addNewOrder(order)
      setLoading(false)
      router.push('/pedidos')
      removeAllProductsCart()
    } catch (err) {
      console.log(err)
      setLoading(false)
      toast.error('Error en el servidor, intente nuevamente')
      return null
    }
  }

  return (
    <Form className='form-payment' onSubmit={handleSubmit}>
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

      {isOpen && (
        <>
          <h4>Cantidad en efectivo, para devolver el cambio</h4>
          <Form.Input
            type='number'
            placeholder='Cambio para'
            onChange={(e) => setCash(e.target.value)}
          />
          <Button
            className='submit'
            type='submit'
            loading={loading}
            disabled={loading}
          >
            Realizar pedido
          </Button>
        </>
      )}
    </Form>
  )
}

export default FormCashPayment
