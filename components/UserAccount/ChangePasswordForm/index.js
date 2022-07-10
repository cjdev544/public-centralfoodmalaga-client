import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Form } from 'semantic-ui-react'

import { useAuth } from '../../../hooks/useAuth'
import { useUi } from '../../../hooks/useUi'

const ChangePasswordForm = () => {
  const { authUser, updatePassword } = useAuth()
  const { isLoading, setIsLoading } = useUi()

  const email = authUser?.email

  const formik = useFormik({
    initialValues: {
      email,
      password: '',
      newPassword: '',
      repeatNewPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().required(true),
      newPassword: Yup.string()
        .min(6)
        .required('La contraseña debe tener almenos 6 caracteres')
        .oneOf([Yup.ref('repeatNewPassword')], true),
      repeatNewPassword: Yup.string()
        .min(6)
        .required('La contraseña debe tener almenos 6 caracteres')
        .oneOf([Yup.ref('newPassword')], true),
    }),

    onSubmit: (formData) => {
      setIsLoading(true)
      updatePassword(formData, setIsLoading)
    },
  })

  return (
    <div className='change-form'>
      <h4>Cambiar la contraseña</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input name='email' placeholder='Correo' value={email} />
          <Form.Input
            name='password'
            type='password'
            placeholder='Contraseña'
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            name='newPassword'
            type='password'
            placeholder='Nueva contraseña'
            onChange={formik.handleChange}
            value={formik.values.newPassword}
            error={formik.errors.newPassword}
          />
          <Form.Input
            name='repeatNewPassword'
            type='password'
            placeholder='Confirma la nueva contraseña'
            onChange={formik.handleChange}
            value={formik.values.repeatNewPassword}
            error={formik.errors.repeatNewPassword}
          />
        </Form.Group>
        <Button type='submit' className='submit' loading={isLoading}>
          Actualizar
        </Button>
      </Form>
    </div>
  )
}

export default ChangePasswordForm
