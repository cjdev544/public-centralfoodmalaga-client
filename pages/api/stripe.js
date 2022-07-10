const admin = require('firebase-admin')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const { round } = require('mathjs')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.PROJECT_ID,
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY,
    }),
  })
}
const db = admin.firestore()

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  try {
    const {
      products,
      idUser,
      username,
      addressShipping,
      values,
      priceShipping,
    } = req.body

    const productsSend = []
    let totalPayment = 0
    let firstBuyDiscount
    let searchProduct
    let array = []
    let descuento = {}
    let notDiscount = null
    let data = {}

    // Is first buy for client?
    const getFirstBuyDiscount = async () => {
      const firstBuyDiscountRef = db
        .collection('firstBuy')
        .doc(process.env.FIRST_BUY_DOCUMENT)
      const doc = await firstBuyDiscountRef.get()
      firstBuyDiscount = doc.data().cost
      descuento = {
        nombre: 'Descuento por primera compra',
        cost: doc.data().cost,
      }
    }

    const ordersRef = db.collection('orders').where('usuario', '==', idUser)
    const docs = await ordersRef.get()
    docs.forEach((doc) => {
      array.push(doc.data())
    })
    if (!array?.length) {
      getFirstBuyDiscount()
    }

    // Search and calculate subtotal for products
    for await (const product of products) {
      const productsRef = db.collection('products').doc(product.id)
      const doc = await productsRef.get()

      if (doc.exists) {
        searchProduct = { ...doc.data(), id: doc.id }
      }

      const subTotalForProduct = round(product.number * searchProduct.precio, 2)

      totalPayment += subTotalForProduct

      const meibyPepperPlate = searchProduct.path.includes('noodles')
      let namePepperPlate
      if (meibyPepperPlate) namePepperPlate = product.nombre

      productsSend.push({
        producto: namePepperPlate || searchProduct.nombre,
        id: searchProduct.id,
        precioUnitario: searchProduct.precio,
        descripcion: searchProduct.descripcion,
        cantidadDelProducto: product.number,
        subTotal: subTotalForProduct,
        path: searchProduct.path,
        url: searchProduct.image,
        vendido: searchProduct.vendido,
      })
    }

    if (firstBuyDiscount) {
      notDiscount = round(totalPayment, 2)
      totalPayment = totalPayment - (totalPayment * firstBuyDiscount) / 100
    }

    if (values?.shipping === 'Entrega a domicilio') {
      totalPayment += priceShipping
    }

    totalPayment = round(totalPayment * 100, 2)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPayment,
      currency: 'eur',
    })

    if (values?.shipping === 'Entrega a domicilio') {
      data = {
        usuario: idUser,
        username,
        sinDescuento: notDiscount,
        descuento,
        createdAt: Date.now(),
        totalCompra: round(totalPayment / 100, 2),
        idPago: paymentIntent.id,
        id: paymentIntent.id,
        direccionEnvio: addressShipping,
        pedido: productsSend,
        totalProductos: round(totalPayment / 100 - priceShipping, 2),
        costoEnvio: priceShipping,
        cubiertosParaPersonas: values?.cubiertosParaPersonas,
        fechaEntrega: values?.fechaEntrega,
        horaEntrega: values?.horaEntrega,
        notas: values?.notes,
      }
    } else {
      data = {
        name: values.name,
        phone: values.phone,
        usuario: idUser,
        username,
        sinDescuento: notDiscount,
        descuento,
        createdAt: Date.now(),
        totalCompra: round(totalPayment / 100, 2),
        idPago: paymentIntent.id,
        id: paymentIntent.id,
        direccionEnvio: addressShipping,
        pedido: productsSend,
        totalProductos: round(totalPayment / 100 - priceShipping, 2),
        costoEnvio: priceShipping,
        cubiertosParaPersonas: values?.cubiertosParaPersonas,
        fechaEntrega: values?.fechaEntrega,
        horaEntrega: values?.horaEntrega,
        notas: values?.notes,
      }
    }

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      order: data,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      msg: err,
    })
  }
}
