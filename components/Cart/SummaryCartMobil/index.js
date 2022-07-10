import { useCart } from '../../../hooks/useCart'
import ProductCartMobile from './ProductCartMobile'
import style from './SummaryCartMobile.module.css'

const SummaryCartMobil = ({ products, totalPriceToPay }) => {
  const { removeAllProductsCart } = useCart()

  return (
    <div className={style.cartMobile}>
      <div className={style.title}>
        Productos
        <div className={style.plus} onClick={removeAllProductsCart}>
          Vaciar carrito
        </div>
      </div>
      <div className={style.data}>
        {products?.map((product) => (
          <ProductCartMobile key={product.id} plate={product} />
        ))}
      </div>
      <div className={style.resume}>
        Total productos: <span>{totalPriceToPay}€</span>
      </div>
    </div>
  )
}

export default SummaryCartMobil
