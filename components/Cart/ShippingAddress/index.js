import { useEffect, useState } from 'react'
import { Grid } from 'semantic-ui-react'

import { useDataUser } from '../../../hooks/useDataUser'
import BasicModal from '../../modals/BasicModal'
import AddressForm from '../../UserAccount/AddressForm'
import Address from './Address'
import style from './ShippingAddress.module.css'

const ShippingAddress = ({
  setAddress,
  values,
  addressActive,
  setAddressActive,
}) => {
  const { dataUser } = useDataUser()
  const addresses = dataUser?.addresses

  const [formModal, setFormModal] = useState(null)
  const [showModal, setShowModal] = useState()

  const size = addresses?.length

  useEffect(() => {
    if (values?.shipping === 'Entrega a domicilio' && size === 0) {
      setShowModal(true)
      openModal('Nueva dirección')
    }
  }, [size, values?.shipping])

  useEffect(() => {
    if (values?.shipping === 'Entrega a domicilio' && size > 0) {
      setAddressActive(addresses[0]?.id)
      setAddress(addresses[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses])

  const openModal = () => {
    setFormModal(<AddressForm setShowModal={setShowModal} />)
    setShowModal(true)
  }

  if (!addresses) return null

  return (
    <section className={style.shipping}>
      <h4>Elige una dirección ó crea una nueva</h4>
      <div className={style.title}>
        Dirección de envío
        <div
          className={style.plus}
          onClick={() => openModal('Nueva dirección')}
        >
          Nueva dirección<span>+</span>
        </div>
      </div>
      <div className={`${style.data} shipping-address`}>
        {size === 0 ? (
          <h3>No hay direcciones creadas</h3>
        ) : (
          <Grid>
            {addresses?.map((address) => (
              <Address
                key={address.id}
                address={address}
                setAddress={setAddress}
                addressActive={addressActive}
                setAddressActive={setAddressActive}
              />
            ))}
          </Grid>
        )}
      </div>
      <BasicModal
        title='Crear dirección'
        showModal={showModal}
        setShowModal={setShowModal}
      >
        {formModal}
      </BasicModal>
    </section>
  )
}

export default ShippingAddress
