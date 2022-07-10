import { Button, Form } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../../../hooks/useAuth'
import { useUi } from '../../../hooks/useUi'

const ChangeNameForm = () => {
  const { authUser, updateNameUser } = useAuth()
  const userName = authUser?.name
  const { setIsLoading, isLoading } = useUi()

  const splitUserName = userName?.split(' ')

  const formik = useFormik({
    initialValues: { name: splitUserName[0], lastname: splitUserName[1] },
    validationSchema: Yup.object({
      name: Yup.string().required(true),
      lastname: Yup.string().required(true),
    }),

    onSubmit: (formData) => {
      setIsLoading(true)
      updateNameUser(formData, setIsLoading)
    },
  })

  return (
    <div className='change-form'>
      <h4>Cambiar nombre y apellido</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input
            name='name'
            placeholder='Nuevo nombre'
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name}
          />
          <Form.Input
            name='lastname'
            placeholder='Nuevo apellido'
            onChange={formik.handleChange}
            value={formik.values.lastname}
            error={formik.errors.lastname}
          />
        </Form.Group>
        <Button type='submit' className='submit' loading={isLoading}>
          Actualizar
        </Button>
      </Form>
    </div>
  )
}

export default ChangeNameForm
