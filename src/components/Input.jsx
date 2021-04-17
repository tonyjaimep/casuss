import React from 'react'
import { Field } from 'formik'

const Input = props => {
  return <Field {...props} className="p-4 bg-gray-200 focus:bg-gray-100 focus:ring-4 ring-gray-600 focus:outline-none ring-opacity-50 transition-shadow block w-full"/>
}

export default Input;
