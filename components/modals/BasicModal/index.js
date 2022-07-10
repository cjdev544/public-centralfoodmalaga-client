import { Modal, Icon } from 'semantic-ui-react'

const BasicModal = ({ title, showModal, setShowModal, children, ...rest }) => {
  const onClose = () => setShowModal(false)

  return (
    <Modal
      className='basic-modal'
      open={showModal}
      onClose={onClose}
      size='small'
      {...rest}
    >
      <Modal.Header>
        <span>{title}</span>
        <Icon name='close' onClick={onClose} />
      </Modal.Header>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  )
}

export default BasicModal
