import React from 'react'

import Input from '../components/Input.jsx'

import { Search } from 'react-feather'

import { useHistory } from 'react-router-dom'

import {
  Form,
  Formik,
} from 'formik'

const Homepage = () => {
  const history = useHistory()

  const formikConfig = {
    initialValues: { query: "" },
    onSubmit: values => {
      history.push(`/search/${encodeURIComponent(values.query)}`)
    }
  }

  return <section>
    <div className="container">
      <h1 className="text-6xl font-bold mb-8 font-serif text-center tracking-wide">Encuentro mis libros favoritos</h1>
      <Formik {...formikConfig}>
        <Form>
          <div className="relative">
            <Input type="text" name="query" placeholder="Buscar por título, autor o descripción"/>
            <button className="absolute right-0 top-0 p-4" type="submit">
              <Search size="1.4em"/>
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  </section>
}

export default Homepage
