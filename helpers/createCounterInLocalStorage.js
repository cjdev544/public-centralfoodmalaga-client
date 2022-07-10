export const createCounterInLocalStorage = (order) => {
  const milisecundsInMinute = 1000 * 60
  const minuteTarget = order.deliveryIn * milisecundsInMinute
  const dateTarget = new Date(minuteTarget + Date.now())
  const value = (dateTarget - 0).toString()
  localStorage.setItem(`orderCF_${order.id}`, value)
}
