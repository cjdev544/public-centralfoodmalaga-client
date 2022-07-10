import { useDispatch, useSelector } from 'react-redux'
import { uiIsLoading, uiShowModal } from '../redux/actions/ui'

export const useUi = () => {
  const dispatch = useDispatch()

  const { showModal, isLoading } = useSelector((state) => state.ui)

  const setShowModal = (show) => {
    dispatch(uiShowModal(show))
  }

  const setIsLoading = (loading) => {
    dispatch(uiIsLoading(loading))
  }

  return {
    showModal,
    isLoading,
    setShowModal,
    setIsLoading,
  }
}
