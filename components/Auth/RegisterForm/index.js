import { useState } from 'react'
import { useFormik } from 'formik'
import { Form, Button, Icon, Radio } from 'semantic-ui-react'
import * as Yup from 'yup'

import { useUi } from '../../../hooks/useUi'
import { useAuth } from '../../../hooks/useAuth'

const RegisterForm = ({ setShowLogin }) => {
  const [wantSubscribe, setWantSubscribe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { isLoading, setIsLoading, setShowModal } = useUi()

  const { registerEmail, loginGoogle } = useAuth()

  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(true),
      lastname: Yup.string().required(true),
      email: Yup.string().email(true).required(true),
      password: Yup.string()
        .min(6)
        .required('La contraseña debe tener almenos 6 caracteres'),
    }),

    onSubmit: async (formData) => {
      setIsLoading(true)
      const username = `${formData.name} ${formData.lastname}`
      registerEmail(
        formData.email,
        formData.password,
        username,
        wantSubscribe,
        setShowModal,
        setIsLoading
      )
    },
  })

  const handelLoginGoogle = () => {
    setShowModal(false)
    loginGoogle()
  }

  const handleRadio = (e, { checked }) => {
    setWantSubscribe(checked)
  }

  return (
    <Form className='form' onSubmit={formik.handleSubmit}>
      <Form.Input
        name='name'
        type='text'
        placeholder='Nombre'
        autoFocus
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Form.Input
        name='lastname'
        type='text'
        placeholder='Apellido'
        onChange={formik.handleChange}
        error={formik.errors.lastname}
      />
      <Form.Input
        name='email'
        type='text'
        placeholder='Correo electrónico'
        autoComplete='current-email'
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name='password'
        type={showPassword ? 'text' : 'password'}
        placeholder='Contraseña'
        autoComplete='current-password'
        onChange={formik.handleChange}
        icon={
          showPassword ? (
            <Icon
              name='eye slash outline'
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <Icon
              name='eye'
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          )
        }
        error={formik.errors.password}
      />
      <Radio
        toggle
        label='Qiero recibir ofertas y promociones'
        onChange={handleRadio}
        name='subscribe'
      />
      <div className='actions'>
        <Button
          type='button'
          className='ui active button'
          primary
          onClick={handelLoginGoogle}
        >
          <Icon className='google'></Icon>
          Registrar con Gmail
        </Button>
        <Button type='button' basic onClick={() => setShowLogin(true)}>
          Iniciar sesión
        </Button>
        <Button type='submit' className='submit' loading={isLoading}>
          Registrar usuario
        </Button>
      </div>
    </Form>
  )
}

export default RegisterForm
