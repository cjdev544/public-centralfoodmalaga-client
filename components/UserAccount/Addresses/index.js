import { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'

import { useAuth } from '../../../hooks/useAuth'
import { useDataUser } from '../../../hooks/useDataUser'
import BasicModal from '../../modals/BasicModal'
import Address from './Address'
import style from './Addresses.module.css'

const Addresses = ({
  title,
  showModal,
  setShowModal,
  formModal,
  openModal,
}) => {
  const { authUser } = useAuth()
  const { dataUser, getAddressesUser } = useDataUser()
  const addresses = dataUser?.addresses
  const size = addresses?.length

  useEffect(() => {
    if (authUser?.uid) {
      if (!addresses) {
        getAddressesUser(authUser?.uid)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser, addresses])

  return (
    <section className='addresses'>
      <div className='data'>
        <div className={style.listAddresses}>
          {size === 0 || !size ? (
            <h3 className={style.text}>No hay direcciones creadas</h3>
          ) : (
            <Grid>
              {addresses?.map((address) => (
                <Grid.Column
                  key={address.id}
                  mobile={16}
                  tablet={8}
                  computer={4}
                >
                  <Address address={address} openModal={openModal} />
                </Grid.Column>
              ))}
            </Grid>
          )}
        </div>
      </div>
      <BasicModal
        title={title}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        {formModal}
      </BasicModal>
    </section>
  )
}

export default Addresses
