import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { round } from 'mathjs'
import { Icon, Table } from 'semantic-ui-react'

import { useLocalStorage } from '../../../../hooks/useLocalStorage'
import NoImage from '../../../../public/no-image.png'
import {
  removePlateStorage,
  updatePlateStorage,
} from '../../../../redux/actions/cart'
import style from '../SummaryCart.module.css'

const TableCellProduct = ({ product }) => {
  const dispatch = useDispatch()
  const { updateProductCart, deleteProductCart } = useLocalStorage()

  const [counter, setCounter] = useState(product.number)
  const [total, setTotal] = useState(product?.precio)

  useEffect(() => {
    setTotal(round(product?.precio * counter, 2))
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
    const cart = updateProductCart(product, counter)
    dispatch(updatePlateStorage(cart))
  }

  const deleteProduct = () => {
    const cart = deleteProductCart(product)
    dispatch(removePlateStorage(cart))
  }

  return (
    <Table.Row className={style.product}>
      <Table.Cell>
        <Image
          src={product?.image ? product.image : NoImage}
          alt={product?.nombre}
          width={50}
          height={50}
        />
        {product?.nombre}
      </Table.Cell>
      <Table.Cell>{`${product?.precio}€`}</Table.Cell>
      <Table.Cell className={style.plusMinus}>
        <Icon name='minus circle' link onClick={minusPlate} />
        <span>{counter}</span>
        <Icon name='plus circle' link onClick={plusPlate} />
      </Table.Cell>
      <Table.Cell className={style.price}>{`${total}€`}</Table.Cell>
    </Table.Row>
  )
}

export default TableCellProduct
