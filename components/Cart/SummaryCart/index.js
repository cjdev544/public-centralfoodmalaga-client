import { Table } from 'semantic-ui-react'
import { useCart } from '../../../hooks/useCart'
import TableCellProduct from './ProductCart/TableCellProduct'
import style from './SummaryCart.module.css'

const SummaryCart = ({ products, totalPriceToPay }) => {
  const { removeAllProductsCart } = useCart()

  return (
    <div className={style.summary}>
      <div className={style.title}>
        Productos
        <div className={style.plus} onClick={removeAllProductsCart}>
          Vaciar carrito
        </div>
      </div>
      <div className={style.data}>
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Producto</Table.HeaderCell>
              <Table.HeaderCell>Precio unitario</Table.HeaderCell>
              <Table.HeaderCell>Cantidad</Table.HeaderCell>
              <Table.HeaderCell>Subtotal</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {products?.map((product) => (
              <TableCellProduct key={product.id} product={product} />
            ))}
            <Table.Row className={style.resume}>
              <Table.Cell className={style.clear}></Table.Cell>
              <Table.Cell colSpan='2'>TOTAL PRODUCTOS:</Table.Cell>
              <Table.Cell
                className={style.total}
              >{`${totalPriceToPay}€`}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default SummaryCart
