export const concatArray = (res) => {
  const sushiGuay = res?.sushiguay_platoes || []
  const guayWok = res?.guaywok_platoes || []
  const saborCasita = res?.sabor_casita_platoes || []
  const tapas = res?.tapas_platoes || []
  const bebidas = res?.bebidas_platoes || []

  return sushiGuay
    .concat(guayWok)
    .concat(saborCasita)
    .concat(tapas)
    .concat(bebidas)
    .filter((e) => e !== undefined)
}
