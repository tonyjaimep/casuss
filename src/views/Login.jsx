import React, { useState } from 'react'

import {
  Link,
  useHistory,
  useLocation
} from 'react-router-dom'

import { Formik, Form } from 'formik'
import Input from '../components/Input.jsx'

import { login } from '../api/actions'

import { useUser } from '../contexts/UserContext'

const Login = () => {
  const [error, setError] = useState(false)

  const userContext = useUser()

  const location = useLocation()
  const history = useHistory()

  const formikConfig = {
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: values => {
      setError(false)
      login(values).then(res => {
        userContext.dispatch({
          type: 'login',
          user: res.data
        })

        const queryRedirect = new URLSearchParams(location.search).get('redirect')
        const redirect = queryRedirect || "/"
        history.push(redirect)
      }).catch(() => {
        setError(true)
      })
    }
  }

  return <section>
    <div className="container">
      <h2 className="text-2xl font-bold font-serif trailing-wide mb-8 text-center">Entrar a mi cuenta</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-start-2">
          <Formik {...formikConfig}>
            <Form>
              <div className="mb-4">
                <label htmlFor="username" className="mb-2">Usuario</label>
                <Input type="text" name="username"/>
              </div>
              <div className="mb-4">
                <label htmlFor="username" className="mb-2">Contraseña</label>
                <Input type="password" name="password"/>
              </div>
              { error && <div className="my-4 text-red-500 text-center">Credenciales inválidas</div> }
              <div className="grid gap-4 grid-cols-2">
                <Link to="/register" className="p-4 block text-center">Crear una cuenta</Link>
                <button type="submit" className="p-4 bg-black text-white">Entrar</button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  </section>
}

export default Login
