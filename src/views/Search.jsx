import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { fetchBooks } from '../api/actions'

import Book from '../components/Book.jsx'

const Search = props => {
  const [searching, setSearching] = useState(true);
  const [results, setResults] = useState([]);
  const [decodedQuery, setDecodedQuery] = useState();

  const { query } = useParams();

  useEffect(() => {
    setDecodedQuery(decodeURIComponent(query))

    fetchBooks().then(res => {
      setResults(res.data)
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setSearching(false)
    })
  }, [query])

  return <section>
    <div className="container">
      { searching && "Buscando..." }
      { results.length > 0 &&
        <h3 className="text-xl font-bold mb-4 font-serif">
          Encontramos { results.length } resultado(s)
          { query &&
            <span> para tu búsqueda "{ decodedQuery }"</span>
          }
        </h3>
      }
      <div className="grid grid-cols-3 xl:grid-cols-6 gap-4">
        { results.map(result => <Book key={result._id} book={result}/>) }
      </div>
    </div>
  </section>
}

export default Search
