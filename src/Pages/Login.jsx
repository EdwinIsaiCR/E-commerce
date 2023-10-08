import { useForm } from 'react-hook-form'
import { loginUserService } from '@/services/userServices'
import { useAuthContext } from '@/Hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import '@/styles/form.css'
import logo from '@/assets/react.svg'

import { useState } from 'react'

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  const { login } = useAuthContext()
  const onSubmit = async (data) => {
    try {
      const response = await loginUserService(data)
      if (response.status === 200) {
        navigate('/')
        console.log('Usuario autenticado exitosamente')
        login(response.data.token)
      }
    } catch (error) {
      /* console.log('Ocurrio un error en Login', error) */
      setError(true)
    }
  }

  return (
    <>
      <main className='form-signin w-100 m-auto'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <img
            className='mb-4'
            src={logo}
            alt=''
            width={72}
            height={57}
          />
          <h1 className='h3 mb-3 fw-normal'>Please sign in</h1>
          <div className='form-floating'>
            <input
              type='email'
              name='email'
              className='form-control'
              id='floatingInput'
              placeholder='name@example.com'
              {...register('email')}
            />
            <label htmlFor='floatingInput'>Email address</label>
          </div>
          <div className='form-floating'>
            <input
              type='password'
              name='password'
              className='form-control'
              id='floatingPassword'
              placeholder='Password'
              {...register('password')}
            />
            <label htmlFor='floatingPassword'>Password</label>
          </div>
          <button className='btn btn-primary w-100 py-2' type='submit'>
            Sign in
          </button>
          {(error)
            ? <p className='mt-5 mb-3 text-body-secondary' style={{ backgroundColor: '#cccccc' }}>Error al inicar sesion</p>
            : <p />}
        </form>
      </main><div className='margin' />
    </>
  )
}
export default Login
