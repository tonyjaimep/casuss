import React, { useState } from 'react'

import {
  Link,
  useHistory,
  useLocation
} from 'react-router-dom'

import { Formik, Form } from 'formik'
import Input from '../components/Input.jsx'

import { register } from '../api/actions'

const Register = () => {
  const [error, setError] = useState(false)

  const location = useLocation()
  const history = useHistory()

  const formikConfig = {
    initialValues: {
      name: '',
      username: '',
      password: ''
    },
    onSubmit: values => {
      setError(false)
      register(values).then(() => {
        const queryRedirect = new URLSearchParams(location.search).get('redirect')
        const redirect = queryRedirect || "/login"
        history.push(redirect)
      }).catch(() => {
        setError(true)
      })
    }
  }

  return <section>
    <div className="container">
      <h2 className="text-2xl font-bold font-serif trailing-wide mb-8 text-center">Crear una cuenta</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-start-2">
          <Formik {...formikConfig}>
            <Form>
              <div className="mb-4">
                <label htmlFor="name" className="mb-2">Nombre</label>
                <Input type="text" name="name"/>
              </div>
              <div className="mb-4">
                <label htmlFor="username" className="mb-2">Usuario</label>
                <Input type="text" name="username"/>
              </div>
              <div className="mb-4">
                <label htmlFor="username" className="mb-2">Contraseña</label>
                <Input type="password" name="password"/>
              </div>
              { error && <p className="text-center text-red-500 my-4">Ocurrió un error al crear su cuenta</p> }
              <div className="grid gap-4 grid-cols-2">
                <Link to="/login" className="p-4 block text-center">Entrar a mi cuenta</Link>
                <button type="submit" className="p-4 bg-black text-white">Crear mi cuenta</button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  </section>
}

export default Register
