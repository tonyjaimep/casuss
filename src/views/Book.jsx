import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { fetchBook, fetchSimilarBooks } from '../api/actions'

import { User } from 'react-feather'

import { default as BookCard } from '../components/Book.jsx'

const BookView = () => {
  const [book, setBook] = useState()
  const [similarBooks, setSimilarBooks] = useState([])
  const [loading, setLoading] = useState(false)

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

  return <section>
    { loading ? "Cargando..." : book &&
      <div className="container">
        <div className="mb-8">
          <h2 className="font-serif text-5xl font-bold mb-2 tracking-wide">{ book.title }</h2>
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
