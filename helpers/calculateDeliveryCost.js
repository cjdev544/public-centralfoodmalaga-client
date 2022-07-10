export const calculateDeliveryCost = (deliveryPrices, address) => {
  const distance = address?.zone?.distNumber
  let costForDelivery

  const getCost = (addressDistance) => {
    return deliveryPrices?.filter(
      (deliveryPrice) => deliveryPrice?.distancia === addressDistance
    )
  }

  if (distance <= 2) {
    costForDelivery = getCost('0 a 2km')
  } else if (distance <= 6) {
    costForDelivery = getCost('2 a 6km')
  } else {
    costForDelivery = getCost('6 a 10km')
  }

  return costForDelivery[0]?.costo
}
