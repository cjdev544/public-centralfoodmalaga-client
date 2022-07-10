import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Form, Icon, Radio } from 'semantic-ui-react'
import { useAuth } from '../../../hooks/useAuth'
import { useUi } from '../../../hooks/useUi'
import { useState } from 'react'

const LoginForm = ({ setShowLogin }) => {
  const { loginEmail, resetPassword, loginGoogle } = useAuth()
  const { isLoading, setIsLoading, setShowModal } = useUi()
  const [wantSubscribe, setWantSubscribe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email(true).required(true),
      password: Yup.string().required(true),
    }),

    onSubmit: async (formData) => {
      setIsLoading(true)
      loginEmail(
        formData.email,
        formData.password,
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

  const handleResetPassword = () => {
    formik.setErrors({})
    const validatorEmail = Yup.string().email().required()
    if (!validatorEmail.isValidSync(formik.values.email)) {
      formik.setErrors({ email: true })
    } else {
      resetPassword(formik.values.email)
      setShowModal(false)
      setIsLoading(false)
    }
  }

  const handleRadio = (e, { checked }) => {
    setWantSubscribe(checked)
  }

  return (
    <Form className='form' onSubmit={formik.handleSubmit}>
      <Form.Input
        name='email'
        type='text'
        placeholder='Correo electrónico'
        autoFocus
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
        label='Quiero recibir ofertas y promociones'
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
          Iniciar con Gmail
        </Button>
        <Button type='button' basic onClick={() => setShowLogin(false)}>
          Registrar usuario
        </Button>
        <Button type='submit' className='submit' loading={isLoading}>
          Iniciar sesión
        </Button>
      </div>
      <p className='changePassword' onClick={handleResetPassword}>
        ¿Has olvidado la contraseña?
      </p>
    </Form>
  )
}

export default LoginForm
