import { round } from 'mathjs'

export const calculateCostOrder = (
  products,
  idUser,
  addressShipping,
  values,
  priceShipping
) => {
  return new Promise((resolve, reject) => {
    let totalPayment = 0

    const productsSend = products.map((product) => {
      const subTotalForProduct = round(product.number * product.precio, 2)

      totalPayment += subTotalForProduct

      return {
        producto: product.nombre,
        id: product.id,
        precioUnitario: product.precio,
        descripcion: product.descripcion,
        cantidadDelProducto: product.number,
        subTotal: subTotalForProduct,
        path: product.path,
        url: product.image,
      }
    })

    if (values?.shipping === 'Entrega a domicilio') {
      totalPayment += priceShipping
    }

    totalPayment = round(totalPayment * 100, 2)

    const data = {
      usuario: idUser,
      totalCompra: totalPayment,
      direccionEnvio: addressShipping,
      pedido: productsSend,
      totalProductos: round(totalPayment / 100 - priceShipping, 2),
      costoEnvio: priceShipping,
      cubiertosParaPersonas: values?.cubiertosParaPersonas,
      fechaEntrega: values?.fechaEntrega,
      horaEntrega: values?.horaEntrega,
      notas: values?.notes,
    }
    if (!totalPayment || totalPayment === 0) {
      reject(new Error('Error en la sumatoria a pagar'))
    } else {
      resolve(data)
    }
  })
}
