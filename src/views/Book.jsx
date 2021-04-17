import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { fetchBook } from '../api/actions'

import { User } from 'react-feather'

const BookView = () => {
  const [book, setBook] = useState()
  const [loading, setLoading] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    setLoading(true)

    fetchBook(id).then(response => {
      setBook(response.data)
    }).finally(() => {
      setLoading(false)
    })
  }, [id])

  return <section>
    { loading ? "Cargando..." : book &&
      <div className="container">
        <div className="mb-8">
          <h2 className="font-serif text-4xl font-bold mb-2">{ book.title }</h2>
          { book.author &&
            <p>
              <User size="1em" className="inline mr-2" fill="currentColor" stroke="transparent"/>
              { book.author }
            </p>
          }
        </div>
        <div className="mb-8">
          <p className="font-serif font-bold text-2xl mb-4">
            ${ book.unitPrice / 100 }
            <span className="text-xs ml-2 text-gray-700">por unidad</span>
          </p>
          <p className="text-sm">
            <span className="font-bold">{ book.stock }</span> libro{book.stock !== 1 && 's'} en existencia
          </p>
        </div>
        <p className="mb-4">{ book.description }</p>
      </div>
    }
  </section>
}

export default BookView
