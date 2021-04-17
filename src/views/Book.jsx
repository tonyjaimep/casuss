import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { fetchBook, fetchSimilarBooks } from '../api/actions'

import { User, AlertTriangle } from 'react-feather'

import { default as BookCard } from '../components/Book.jsx'

import { useCart } from '../contexts/CartContext'

import { Formik } from 'formik'

import Input from '../components/Input'

const BookView = () => {
  const [book, setBook] = useState()
  const [similarBooks, setSimilarBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [quantityInCart, setQuantityInCart] = useState(0)

  const cartContext = useCart()

  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    setSimilarBooks([])

    fetchBook(id).then(response => {
      setBook(response.data)
      fetchSimilarBooks(id).then(res => {
        setSimilarBooks(res.data)
      }).catch(() => {
        setSimilarBooks([])
      })
    }).finally(() => {
      setLoading(false)
    })
  }, [id])

  useEffect(() => {
    if (!book)
      return;

    const cartEntry = cartContext.state.find(entry => entry.book._id === book._id)

    setQuantityInCart((book && cartEntry) ? cartEntry.quantity : 0)
  }, [book, cartContext])

  const formikConfig = {
    initialValues: {
      quantity: quantityInCart
    },
    onSubmit: ({ quantity }) => {
      if (quantity === 0) {
        cartContext.dispatch({
          type: 'remove',
          book: book._id,
        })
      } else if (quantityInCart !== 0) {
        cartContext.dispatch({
          type: 'change quantity',
          book: book._id,
          quantity
        })
      } else {
        cartContext.dispatch({
          type: 'add',
          book,
          quantity
        })
      }
    },
    enableReinitialize: true
  }

  return <section>
    { loading ? "Cargando..." : book &&
      <div className="container">
        <div className="mb-8">
          <h2 className="font-serif text-5xl font-bold mb-2 tracking-wide">{ book.title }</h2>
          { book.author &&
            <p className="mb-4">
              <User size="1em" className="inline mr-2" fill="currentColor" stroke="transparent"/>
              { book.author }
            </p>
          }
          <p className="uppercase text-xs">ISBN: { book.isbn }</p>
        </div>
        <div className="mb-8">
          <p className="font-serif font-bold text-2xl mb-4">
            ${ book.unitPrice / 100 }
            <span className="text-xs ml-2 text-gray-700">por unidad</span>
          </p>
          <p className="text-sm mb-4">
            <span className="font-bold">{ book.stock }</span> libro{book.stock !== 1 && 's'} en existencia
          </p>
          <Formik {...formikConfig}>
            {({handleSubmit, values, dirty}) => <form onSubmit={handleSubmit}>
              { values.quantity > book.stock &&
                <div className="p-4 bg-gray-300 mb-4 text-sm">
                  <h6 className="font-bold"><AlertTriangle size="1em" className="inline"/> Su pedido se fragmentará</h6>
                  Por el momento nuestro stock es menor a la cantidad de libros que solicitó, por lo que su pedido se fragmentará y se cumplirá por completo hasta que renovemos existencias de este libro
                </div>
              }
              <div className="grid grid-cols-2">
                <Input name="quantity" type="number"/>
                <button type="submit" className="p-4 bg-black text-white" disabled={!dirty}>
                  { quantityInCart ?
                    "Actualizar carrito"
                    :
                    "Agregar al carrito"
                  }
                </button>
              </div>
            </form> }
          </Formik>
        </div>
        <p className="mb-8">{ book.description }</p>

        { similarBooks.length > 0 &&
          <section>
            <h3 className="text-3xl font-serif font-bold mb-4">Libros similares</h3>
            <div className="grid grid-cols-3 xl:grid-cols-6 gap-4">
              { similarBooks.map(book => <BookCard key={book._id} book={book}/>) }
            </div>
          </section>
        }
      </div>
    }
  </section>
}

export default BookView
