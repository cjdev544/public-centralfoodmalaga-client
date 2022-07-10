import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from 'semantic-ui-react'
import moment from 'moment'
import 'moment/locale/es'

import NoImage from '../../../../public/no-image.png'
import BasicModal from '../../../modals/BasicModal'
import style from './Order.module.css'

const Order = ({ order }) => {
  const {
    createdAt,
    direccionEnvio,
    pedido,
    descuento,
    sinDescuento,
    totalCompra,
    totalProductos,
    costoEnvio,
    cubiertosParaPersonas,
    fechaEntrega,
    horaEntrega,
    id,
  } = order

  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className={style.order}>
        {!order?.deliveryIn && <div className={style.alert}>Por confirmar</div>}
        {order?.deliveryIn && !order?.orderSend && (
          <div className={style.sending}>
            Entrega aproximada: {order.deliveryIn} min
          </div>
        )}
        {order?.orderSend && <div className={style.send}>Enviado</div>}
        <div className={style.header}>
          <p>Pedido: {id}</p>
          <div className={style.flex}>
            <p>
              {moment(createdAt).format('L')} - {moment(createdAt).format('LT')}
            </p>
            <p className={style.icon} onClick={() => setShowModal(true)}>
              Ver más <Icon name='eye' circular />
            </p>
          </div>
        </div>
        {pedido?.map((product) => (
          <div className={style.box} key={product.id}>
            <div className={style.info}>
              <Link href={`/plato/${product?.path}`}>
                <a>
                  <Image
                    src={product?.url ? product.url : NoImage}
                    alt={product.producto}
                    width={100}
                    height={100}
                  />
                </a>
              </Link>
              <div className={style.data}>
                <h4>{product.producto}</h4>
                <p>Precio unitario: {product.precioUnitario}€</p>
                <p>Cantidad del producto: {product.cantidadDelProducto}</p>
                <p>Subtotal: {product.subTotal}€</p>
              </div>
            </div>
          </div>
        ))}
        {!descuento?.cost && (
          <div className={style.span}>
            <span>Total por productos: {totalProductos}€</span>
            <span>Costo de envío: {costoEnvio}€</span>
          </div>
        )}
        {descuento?.cost && (
          <>
            <div className={style.spanBlock}>
              <span>Total por productos: {sinDescuento}€</span>
              <span>
                {descuento.nombre}: {descuento.cost}%
              </span>
            </div>
            <div className={style.span}>
              <span>Descuento aplicado: {totalProductos}€</span>
              <span>Costo de envío: {costoEnvio}€</span>
            </div>
          </>
        )}
        <p className={style.pay}>Total pagado: {totalCompra}€</p>
      </div>
      <BasicModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={`Pedido: ${id}`}
      >
        {direccionEnvio === 'Recogida el en local' ? (
          <p>
            <span className={style.bold}>Pedido para recoger en el local</span>
          </p>
        ) : (
          <p>
            <span className={style.bold}>Dirección del pedido:</span>{' '}
            {direccionEnvio?.details}, {direccionEnvio?.zone?.address}
          </p>
        )}
        <p>
          <span className={style.bold}>Fecha de pedido:</span>{' '}
          {moment(createdAt).format('L')} - {moment(createdAt).format('LT')}
        </p>
        {cubiertosParaPersonas > 1 && (
          <p>
            <span className={style.bold}>Cubiertos para:</span>{' '}
            {cubiertosParaPersonas} personas.
          </p>
        )}
        {cubiertosParaPersonas === 1 && (
          <p>
            <span className={style.bold}>Cubiertos para:</span>{' '}
            {cubiertosParaPersonas} persona.
          </p>
        )}
        <p>
          <span className={style.bold}>Fecha de entrega:</span> {fechaEntrega}
        </p>
        <p>
          <span className={style.bold}>Hora de entrega:</span> {horaEntrega}
        </p>
        <p>
          <span className={style.bold}>Total por productos:</span>{' '}
          {totalProductos}€
        </p>
        <p>
          <span className={style.bold}>Costo de envío:</span> {costoEnvio}€
        </p>
        <p>
          <span className={style.bold}>Total pagado:</span> {totalCompra}€
        </p>
      </BasicModal>
    </>
  )
}

export default Order
