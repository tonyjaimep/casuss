import React, { useEffect, useState } from 'react'

import { useParams, useHistory } from 'react-router-dom'

import { fetchBooks } from '../api/actions'

import Book from '../components/Book.jsx'

import { Formik, Form } from 'formik'
import Input from '../components/Input.jsx'

import { Search as SearchIcon } from 'react-feather'

const Search = props => {
  const [searching, setSearching] = useState(true);
  const [results, setResults] = useState([]);
  const [decodedQuery, setDecodedQuery] = useState();

  const { query } = useParams();
  const history = useHistory();

  useEffect(() => {
    setDecodedQuery(decodeURIComponent(query))

    fetchBooks(query).then(res => {
      setResults(res.data)
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setSearching(false)
    })
  }, [query])

  const formikConfig = {
    initialValues: { query },
    onSubmit: values => {
      history.push(`/search/${encodeURIComponent(values.query)}`)
    },
    enableReinitialize: true
  }

  return <section>
    <div className="container">
      <Formik {...formikConfig}>
        <Form>
          <div className="relative mb-8">
            <Input type="text" name="query" placeholder="Buscar por título, autor o descripción"/>
            <button className="absolute right-0 top-0 p-4" type="submit">
              <SearchIcon size="1.4em"/>
            </button>
          </div>
        </Form>
      </Formik>
      { searching ? "Buscando..." :
        <h3 className="text-xl font-bold mb-4 font-serif tracking-wide">
          { results.length > 0 ?
            <>Se {results.length !== 1 ? 'encontraron' : 'encontró'} { results.length } resultado{results.length !== 1 && 's'}</>
            :
            "No se encontraron resultados"
          }
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
