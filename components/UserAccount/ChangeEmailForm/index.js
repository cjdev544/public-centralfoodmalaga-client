import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Form } from 'semantic-ui-react'

import { useAuth } from '../../../hooks/useAuth'
import { useUi } from '../../../hooks/useUi'
import { useRouter } from 'next/router'

const ChangeEmailForm = () => {
  const { setIsLoading, isLoading } = useUi()
  const { authUser, updateEmailUser } = useAuth()
  const email = authUser.email

  const formik = useFormik({
    initialValues: {
      email,
      password: '',
      newEmail: '',
      repeatEmail: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().required(true),
      newEmail: Yup.string()
        .email(true)
        .required(true)
        .oneOf([Yup.ref('repeatEmail')], true),
      repeatEmail: Yup.string()
        .email(true)
        .required(true)
        .oneOf([Yup.ref('newEmail')], true),
    }),

    onSubmit: (formData) => {
      setIsLoading(true)
      updateEmailUser(formData, setIsLoading)
    },
  })

  return (
    <div className='change-form'>
      <h4>Cambiar Email</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input name='email' placeholder='Correo actual' value={email} />
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
            name='newEmail'
            placeholder='Nuevo email'
            onChange={formik.handleChange}
            value={formik.values.newEmail}
            error={formik.errors.newEmail}
          />
          <Form.Input
            name='repeatEmail'
            placeholder='Confirma el nuevo email'
            onChange={formik.handleChange}
            value={formik.values.repeatEmail}
            error={formik.errors.repeatEmail}
          />
        </Form.Group>
        <Button type='submit' className='submit' loading={isLoading}>
          Actualizar
        </Button>
      </Form>
    </div>
  )
}

export default ChangeEmailForm
