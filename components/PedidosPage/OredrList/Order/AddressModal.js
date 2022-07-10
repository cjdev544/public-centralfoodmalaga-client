import BasicModal from '../../../modals/BasicModal'

const AddressModal = ({ order, direction, createdAt }) => {
  return (
    <BasicModal showModal={showModal} setShowModal={setShowModal} title={order}>
      <h4>Dirección del pedido: {direction}</h4>
      <h4>
        Fecha de pedido: {moment(createdAt).format('L')} -{' '}
        {moment(createdAt).format('LT')}
      </h4>
    </BasicModal>
  )
}

export default AddressModal
