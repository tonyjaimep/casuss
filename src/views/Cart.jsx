import React, { useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom'

import { useCart } from '../contexts/CartContext'

import { fetchShippingOptions, createOrder } from '../api/actions'

import { Formik } from 'formik'

import Input from '../components/Input.jsx'

const Cart = () => {
  const cartContext = useCart()
  const history = useHistory()

  const [total, setTotal] = useState(0)
  const [subtotal, setSubtotal] = useState(0)
  const [shippingOptions, setShippingOptions] = useState([])
  const [shippingOptionsElements, setShippingOptionsElements] = useState([
    <option key={0} label="Recibir en sucursal - GRATIS" value=""/>
  ])

  useEffect(() => {
    setSubtotal(cartContext.state.reduce((acc, entry) => {
      return acc + entry.quantity * entry.book.unitPrice
    }, 0))
  }, [cartContext.state])

  useEffect(() => {
    setTotal(subtotal)
  }, [subtotal])

  useEffect(() => {
    fetchShippingOptions().then(res => {
      setShippingOptions(res.data)
      setShippingOptionsElements([
        ...res.data.map(opt => {
          const labelContents = `${opt.name} - $${opt.price / 100}MXN - ${opt.description}`
          return <option key={opt._id} label={labelContents} value={opt._id}/>
        }),
        <option key={0} label="Recibir en sucursal - GRATIS" value=""/>
      ]

      )

    })
  }, [])

  const formikConfig = {
    initialValues: {
      shippingOption: ""
    },
    onSubmit: values => {
      const data = {
        shippingOption: values.shippingOption,
        books: cartContext.state.map(entry => ({
          book: entry.book._id,
          quantity: entry.quantity
        }))
      }

      createOrder(data).then(() => {
        history.push('/profile/orders')
      })
    }
  }

  const handleShippingOptionChange = (event) => {
    const value = event.target.value;

    const selectedShippingOption = shippingOptions.find(opt => opt._id === value)

    if (selectedShippingOption) {
      setTotal(subtotal + selectedShippingOption.price)
    } else {
      setTotal(subtotal)
    }
  }

  return <section>
    <div className="container">
      <h2 className="text-2xl font-bold font-serif mb-4">Mi carrito</h2>
      { cartContext.state.length > 0 ?
        <Formik {...formikConfig}>
          { ({ handleChange, handleSubmit }) =>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                { cartContext.state.map(entry => <div className="bg-gray-100 p-4 flex justify-between gap-4" key={entry.book._id}>
                  <div>
                    <span className="font-sans">{entry.quantity}</span> &times;
                  </div>
                  <p className="font-bold font-serif truncate">{ entry.book.title }</p>
                  <p className="font-bold">
                    ${ Math.floor(entry.book.unitPrice / 100) }
                    <span className="text-xs">.{ ("0" + entry.book.unitPrice % 100).slice(-2) }</span>
                  </p>
                  <p className="font-bold">
                    =
                    ${Math.floor(entry.quantity * entry.book.unitPrice / 100)}
                    <span className="text-xs">
                      .{("0" + (entry.quantity * entry.book.unitPrice) % 100).slice(-2)}
                    </span>
                  </p>
                </div>)}
                <div className="bg-gray-50 p-4 flex justify-between gap-4">
                  <h3 className="font-bold font-serif text-xl">Subtotal</h3>
                  <p className="font-bold font-serif text-xl">
                    ${ Math.floor(subtotal / 100) }
                    <span className="text-xs">.{ ("0" + subtotal % 100).slice(-2) }</span>
                  </p>
                </div>
                <section className="mb-4">
                  <h4 className="font-serif font-bold font-lg mb-2">Envío</h4>
                  <Input as="select" name="shippingOption" onChange={props => { handleChange(props); handleShippingOptionChange(props) }}>
                    { shippingOptionsElements }
                  </Input>
                </section>
                <div className="bg-gray-50 p-4 flex justify-between gap-4 mb-4">
                  <h3 className="font-bold font-serif text-2xl">Total</h3>
                  <p className="font-bold font-serif text-2xl">
                    ${ Math.floor(total / 100) }
                    <span className="text-xs">.{ ("0" + total % 100).slice(-2) }</span>
                  </p>
                </div>
                <button type="submit" className="bg-black text-white p-4 font-serif font-bold text-lg tracking-wide">Continuar con mi orden</button>
              </div>
            </form>
          }
        </Formik>
        :
        <p>Sin libros en mi carrito de compras</p>
      }
    </div>
  </section>
}

export default Cart
