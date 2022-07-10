import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import FormPayment from './FormPayment'
import style from './Payment.module.css'
import FormCashPayment from './FormCashPayment'

const stripePromise = loadStripe(
  // 'pk_test_51JjpmSGQ9k20vhLGgYJkoJtiEL2REioU74X9J3p2rAUaWxtuWBV1DR8ZDGvKrU8UfXFnwFUgxfMgzJAbWdy1fs3l00Y7Ylmtay'
  'pk_live_51JjpmSGQ9k20vhLG901i7z0t3jaSmzgYtcoKqtH2U4rxz7AiJ7klJIcbJ46kchqBAGeXTGkSHuxphRyEbERfGsFL00LSnnp1m5'
)

const Payment = ({
  products,
  address,
  values,
  totalPriceToPay,
  cashPayment,
}) => {
  if (cashPayment !== 'Tarjeta') {
    return (
      <section className={style.payment}>
        <div className={style.title}>Pedido</div>
        <div className={style.data}>
          <FormCashPayment
            products={products}
            address={address}
            values={values}
            totalPriceToPay={totalPriceToPay}
          />
        </div>
      </section>
    )
  }

  return (
    <section className={style.payment}>
      <div className={style.title}>Pago</div>
      <div className={style.data}>
        <Elements stripe={stripePromise}>
          <FormPayment
            products={products}
            address={address}
            values={values}
            totalPriceToPay={totalPriceToPay}
          />
        </Elements>
      </div>
    </section>
  )
}

export default Payment
