import { Radio } from 'semantic-ui-react'
import style from './RadioButtom.module.css'

function RadioButtom({ radioButtom, setRadioButtom }) {
  const handleRadio = (e, { checked }) => {
    setRadioButtom(checked)
  }

  return (
    <div className={style.item}>
      <p className={style.title}>¿Lo deseas picante?</p>
      <div className={style.box}>
        <span className={style.span}>NO</span>
        <Radio toggle checked={radioButtom} onChange={handleRadio} />
        <span className={style.span}>SI</span>
      </div>
    </div>
  )
}

export default RadioButtom
